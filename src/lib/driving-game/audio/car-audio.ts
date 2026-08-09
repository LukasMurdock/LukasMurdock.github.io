import * as THREE from "three";
import type { DrivingProfile } from "../driving-profiles";
import type { DriftPhase } from "../types";
import { ENGINE_WORKLET_SOURCE } from "./engine-worklet-source";
import { TIRE_WORKLET_SOURCE } from "./tire-worklet-source";

type CarAudioParameters = {
  dt: number;
  speed: number;
  forwardSpeed: number;
  signedSlipDegrees: number;
  steeringLoad: number;
  steerDirection: number;
  phase: DriftPhase;
  onPavement: boolean;
  boosting: boolean;
  throttle: number;
  braking: boolean;
  reversing: boolean;
};

export type CarAudio = {
  update: (parameters: CarAudioParameters) => void;
  impact: (strength: number) => void;
  reset: () => void;
  setPaused: (paused: boolean) => void;
  destroy: () => void;
};

export function createCarAudio(DRIVING: DrivingProfile): CarAudio | null {
  const AudioContextClass = window.AudioContext
    ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;

  const context = new AudioContextClass();
  const master = context.createGain();
  master.gain.value = 0.48;
  const compressor = context.createDynamicsCompressor();
  compressor.threshold.value = -12;
  compressor.knee.value = 10;
  compressor.ratio.value = 4;
  compressor.attack.value = 0.004;
  compressor.release.value = 0.18;
  master.connect(compressor).connect(context.destination);

  const sampleCount = context.sampleRate * 2;
  const noiseBuffer = context.createBuffer(1, sampleCount, context.sampleRate);
  const samples = noiseBuffer.getChannelData(0);
  let previousSample = 0;
  for (let i = 0; i < sampleCount; i++) {
    const white = Math.random() * 2 - 1;
    previousSample = previousSample * 0.22 + white * 0.78;
    samples[i] = previousSample;
  }
  function createNoiseSource(offset: number) {
    const source = context.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;
    source.start(0, offset);
    return source;
  }

  // Independent playheads prevent road, wind, and transient effects from sharing a temporal fingerprint.
  const roadNoise = createNoiseSource(0.71);
  const windNoise = createNoiseSource(1.27);
  const transientNoise = createNoiseSource(1.61);

  function noiseLayer(
    source: AudioBufferSourceNode,
    type: BiquadFilterType,
    frequency: number,
    q = 0.8,
    destination: AudioNode = master,
  ) {
    const filter = context.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = frequency;
    filter.Q.value = q;
    const gain = context.createGain();
    gain.gain.value = 0;
    source.connect(filter).connect(gain).connect(destination);
    return { filter, gain };
  }

  const rolling = noiseLayer(roadNoise, "bandpass", 190, 0.65);
  const surface = noiseLayer(roadNoise, "bandpass", 145, 0.8);
  const wind = noiseLayer(windNoise, "highpass", 900, 0.5);
  const transient = noiseLayer(transientNoise, "bandpass", 850, 1.9);

  const engineMidNotch = context.createBiquadFilter();
  engineMidNotch.type = "peaking";
  engineMidNotch.frequency.value = 1200;
  engineMidNotch.Q.value = 1.05;
  engineMidNotch.gain.value = 0;
  engineMidNotch.connect(master);

  let engineNode: AudioWorkletNode | null = null;
  let tireNode: AudioWorkletNode | null = null;
  let audioDestroyed = false;
  const workletUrl = URL.createObjectURL(new Blob(
    [ENGINE_WORKLET_SOURCE, "\n", TIRE_WORKLET_SOURCE],
    { type: "text/javascript" },
  ));
  void context.audioWorklet.addModule(workletUrl).then(() => {
    URL.revokeObjectURL(workletUrl);
    if (audioDestroyed) return;
    engineNode = new AudioWorkletNode(context, "turbo-i6-engine", {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [2],
    });
    tireNode = new AudioWorkletNode(context, "drift-tire-model", {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [2],
    });
    engineNode.connect(engineMidNotch);
    tireNode.connect(master);
    engineNode.port.postMessage({ type: "state", rpm: 900, load: 0.45, spool: 0 });
    tireNode.port.postMessage({
      type: "state",
      speed: 0,
      slip: 0,
      steeringLoad: 0,
      steerDirection: 0,
      phase: "grip",
      onPavement: true,
    });
  }).catch(() => URL.revokeObjectURL(workletUrl));

  let gear = 0;
  let pendingGear = 0;
  let pendingGearTime = 0;
  let lastShiftTime = Number.NEGATIVE_INFINITY;
  let recoveryShiftInhibit = 0;
  let previouslyReversing = false;
  let engineRpm = 900;
  let engineLoad = 0.45;
  let turboSpool = 0;
  let enginePunch = 0;
  let previousVehicleSpeed = 0;
  let previousPhase: DriftPhase = "grip";
  let previouslyBoosting = false;
  let previousSignedSlip = 0;
  let previousAbsoluteSlip = 0;
  let chirpCooldown = 0;

  function setSmooth(parameter: AudioParam, value: number, timeConstant: number) {
    parameter.setTargetAtTime(value, context.currentTime, timeConstant);
  }

  function triggerNoise(volume: number, duration: number, frequency = 900) {
    const now = context.currentTime;
    transient.filter.frequency.cancelScheduledValues(now);
    transient.filter.frequency.setValueAtTime(frequency, now);
    transient.gain.gain.cancelScheduledValues(now);
    transient.gain.gain.setValueAtTime(0.0001, now);
    transient.gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume), now + 0.008);
    transient.gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  }

  function triggerThump(frequency: number, volume: number, duration: number) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(25, frequency * 0.58), context.currentTime + duration);
    gain.gain.setValueAtTime(Math.max(0.0001, volume), context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
    oscillator.connect(gain).connect(master);
    oscillator.start();
    oscillator.stop(context.currentTime + duration + 0.02);
  }

  function triggerLaunchTransition() {
    engineNode?.port.postMessage({
      type: "shift",
      cutDuration: 0.025,
      recoveryDuration: 0.02,
      strength: 0.14,
      release: false,
    });
  }

  function triggerShift() {
    const aggressive = DRIVING.redlineAtMaximumSpeed;
    engineNode?.port.postMessage({
      type: "shift",
      cutDuration: aggressive ? 0.065 : 0.08,
      recoveryDuration: 0.045,
      strength: aggressive ? 0.76 : 0.64,
      release: true,
    });
    triggerNoise(aggressive ? 0.065 : 0.052, 0.05, 1250);
    triggerThump(82, aggressive ? 0.075 : 0.06, 0.09);
  }

  return {
    update({
      dt,
      speed,
      forwardSpeed,
      signedSlipDegrees,
      steeringLoad,
      steerDirection,
      phase,
      onPavement,
      boosting,
      throttle,
      braking,
      reversing,
    }) {
      const now = context.currentTime;
      const speedNormalized = THREE.MathUtils.clamp(speed / DRIVING.maximumSpeed, 0, 1);
      const absoluteSlip = Math.abs(signedSlipDegrees);
      const slipRate = (signedSlipDegrees - previousSignedSlip) / Math.max(dt, 0.001);
      const slipGrowth = (absoluteSlip - previousAbsoluteSlip) / Math.max(dt, 0.001);
      const instability = THREE.MathUtils.clamp(Math.abs(slipRate) / 110, 0, 1);
      chirpCooldown = Math.max(0, chirpCooldown - dt);

      // Five logical stages produce only three fully punctuated shifts. The early launch
      // transition is absorbed, while ordinary profiles settle after their final pull.
      const aggressive = DRIVING.redlineAtMaximumSpeed;
      const gearRatios = aggressive
        ? [0, 0.17, 0.44, 0.69, 0.86, 1]
        : [0, 0.18, 0.46, 0.71, 0.88, 1];
      const gearEdges = gearRatios.map((ratio) => ratio * DRIVING.maximumSpeed);
      const longitudinalSpeed = Math.abs(forwardSpeed);
      const drifting = phase === "breakaway" || phase === "sustain" || phase === "transition";
      const transmissionSpeed = drifting
        ? THREE.MathUtils.lerp(longitudinalSpeed, speed, 0.3)
        : longitudinalSpeed;
      const lastForwardGear = gearEdges.length - 2;

      if (phase === "recover" && previousPhase !== "recover") recoveryShiftInhibit = 0.24;
      else recoveryShiftInhibit = Math.max(0, recoveryShiftInhibit - dt);

      if (reversing) {
        if (!previouslyReversing) {
          gear = 0;
          pendingGear = 0;
          pendingGearTime = 0;
        }
      } else if (!drifting && recoveryShiftInhibit === 0) {
        let desiredGear = gear;
        while (
          desiredGear < lastForwardGear
          && transmissionSpeed >= gearEdges[desiredGear + 1]
        ) desiredGear += 1;
        const downshiftHysteresis = DRIVING.maximumSpeed * 0.06;
        while (
          desiredGear > 0
          && transmissionSpeed < gearEdges[desiredGear] - downshiftHysteresis
        ) desiredGear -= 1;

        if (desiredGear === gear) {
          pendingGear = gear;
          pendingGearTime = 0;
        } else {
          if (pendingGear !== desiredGear) {
            pendingGear = desiredGear;
            pendingGearTime = 0;
          } else {
            pendingGearTime += dt;
          }
          const confirmationDuration = desiredGear < gear || phase === "recover" ? 0.18 : 0;
          if (
            pendingGearTime >= confirmationDuration
            && now - lastShiftTime >= 0.32
          ) {
            const previousGear = gear;
            gear = desiredGear;
            pendingGear = gear;
            pendingGearTime = 0;
            lastShiftTime = now;
            const adjacentUpshift = gear === previousGear + 1;
            if (adjacentUpshift && gear === 1) triggerLaunchTransition();
            else if (adjacentUpshift) triggerShift();
          }
        }
      } else {
        pendingGear = gear;
        pendingGearTime = 0;
      }
      previouslyReversing = reversing;

      const gearStart = gearEdges[gear];
      const gearEnd = gearEdges[gear + 1];
      const gearProgress = THREE.MathUtils.clamp(
        (transmissionSpeed - gearStart) / Math.max(gearEnd - gearStart, 1),
        0,
        1,
      );
      const acceleration = (speed - previousVehicleSpeed) / Math.max(dt, 0.001);
      previousVehicleSpeed = speed;
      const accelerationLoad = THREE.MathUtils.smoothstep(acceleration, 0.15, 7);
      const reverseProgress = THREE.MathUtils.clamp(speed / DRIVING.manual.maximumReverseSpeed, 0, 1);
      const rpmFloors = [2200, 5200, 5200, 5700, 5600];
      const shiftPeakRpm = aggressive ? 7800 : 7600;
      let drivingRpm = 1700 + reverseProgress * 3200;
      if (!reversing) {
        if (gear === lastForwardGear) {
          const loadedTopRpm = THREE.MathUtils.lerp(5600, aggressive ? 7800 : 7000, gearProgress);
          drivingRpm = aggressive
            ? loadedTopRpm
            : THREE.MathUtils.lerp(4600, loadedTopRpm, accelerationLoad);
        } else {
          drivingRpm = THREE.MathUtils.lerp(rpmFloors[gear], shiftPeakRpm, gearProgress);
        }
      }
      const cruiseWander = (1 - accelerationLoad)
        * (Math.sin(now * 0.83) * 42 + Math.sin(now * 2.17) * 19);
      const targetRpm = THREE.MathUtils.lerp(900, drivingRpm, THREE.MathUtils.smoothstep(speed, 0.15, 2))
        + cruiseWander;
      // The worklet owns the single 55 ms RPM response; avoid cascading another long smoother here.
      engineRpm = targetRpm;

      let targetLoad = 0.16
        + speedNormalized * 0.08
        + throttle * 0.28
        + accelerationLoad * 0.18
        + Number(reversing) * 0.12
        + Number(drifting) * 0.22
        + enginePunch * 0.2;
      if (braking) targetLoad = 0.1;
      if (phase === "recover") targetLoad = 0.2;
      if (boosting) targetLoad += 0.22;
      engineLoad = THREE.MathUtils.lerp(engineLoad, THREE.MathUtils.clamp(targetLoad, 0, 1), 1 - Math.exp(-dt / 0.085));
      const targetSpool = THREE.MathUtils.smoothstep(engineRpm, 2700, 3400) * engineLoad;
      const spoolResponse = targetSpool > turboSpool ? 0.18 : 0.32;
      turboSpool = THREE.MathUtils.lerp(turboSpool, targetSpool, 1 - Math.exp(-dt / spoolResponse));
      enginePunch = Math.max(0, enginePunch - dt * 2.7);
      engineNode?.port.postMessage({
        type: "state",
        rpm: engineRpm,
        load: engineLoad,
        spool: turboSpool,
      });

      tireNode?.port.postMessage({
        type: "state",
        speed: speedNormalized,
        slip: signedSlipDegrees,
        steeringLoad,
        steerDirection,
        phase,
        onPavement,
      });
      if (phase === "breakaway" && previousPhase !== "breakaway") {
        const breakawayViolence = THREE.MathUtils.clamp(slipGrowth / 100, 0, 1);
        tireNode?.port.postMessage({ type: "breakaway", strength: 0.65 + breakawayViolence * 0.35 });
        chirpCooldown = 0.1;
      }
      if (phase === "transition" && previousPhase !== "transition") {
        tireNode?.port.postMessage({ type: "transition" });
        triggerThump(68, 0.055, 0.13);
        chirpCooldown = 0.1;
      }
      if (absoluteSlip > 12 && Math.abs(slipRate) > 80 && chirpCooldown <= 0) {
        tireNode?.port.postMessage({ type: "correction", strength: 0.3 + instability * 0.7 });
        chirpCooldown = 0.09;
      }
      const hookedUp = previousAbsoluteSlip > 15 && absoluteSlip < 8
        && (phase === "recover" || previousPhase === "recover");
      if (hookedUp) tireNode?.port.postMessage({ type: "hookup" });
      if (boosting && !previouslyBoosting) {
        enginePunch = 1;
        triggerThump(58, 0.05, 0.16);
      }

      // Preserve engine weight while opening a narrow midrange pocket for loaded tire modes.
      const tireMix = THREE.MathUtils.smoothstep(absoluteSlip, 8, 30) * speedNormalized;
      setSmooth(engineMidNotch.gain, -4 * tireMix, 0.08);
      setSmooth(rolling.gain.gain, 0.004 + speedNormalized * 0.012, 0.12);
      setSmooth(rolling.filter.frequency, 130 + speed * 8, 0.16);

      // Wind moves slowly, while grass has an immediate rough rolling texture.
      setSmooth(wind.gain.gain, THREE.MathUtils.smoothstep(speedNormalized, 0.22, 1) * 0.022, 0.42);
      setSmooth(wind.filter.frequency, 720 + speed * 24, 0.35);
      setSmooth(surface.gain.gain, onPavement ? 0.0001 : speedNormalized * 0.065, onPavement ? 0.2 : 0.08);
      setSmooth(surface.filter.frequency, onPavement ? 170 : 260 + speed * 5, 0.12);

      previousPhase = phase;
      previouslyBoosting = boosting;
      previousSignedSlip = signedSlipDegrees;
      previousAbsoluteSlip = absoluteSlip;
    },
    impact(strength) {
      triggerNoise(0.08 + strength * 0.16, 0.18 + strength * 0.18, 310);
      triggerThump(52, 0.08 + strength * 0.12, 0.2 + strength * 0.12);
    },
    reset() {
      gear = 0;
      pendingGear = 0;
      pendingGearTime = 0;
      lastShiftTime = Number.NEGATIVE_INFINITY;
      recoveryShiftInhibit = 0;
      previouslyReversing = false;
      engineRpm = 900;
      engineLoad = 0.16;
      turboSpool = 0;
      enginePunch = 0;
      previousVehicleSpeed = 0;
      previousPhase = "grip";
      previouslyBoosting = false;
      previousSignedSlip = 0;
      previousAbsoluteSlip = 0;
      chirpCooldown = 0;
      engineNode?.port.postMessage({ type: "reset" });
      engineNode?.port.postMessage({ type: "state", rpm: 900, load: 0.16, spool: 0 });
    },
    setPaused(paused) {
      setSmooth(master.gain, paused ? 0.0001 : 0.48, paused ? 0.035 : 0.08);
    },
    destroy() {
      audioDestroyed = true;
      roadNoise.stop();
      windNoise.stop();
      transientNoise.stop();
      engineNode?.disconnect();
      tireNode?.disconnect();
      void context.close();
    },
  };
}
