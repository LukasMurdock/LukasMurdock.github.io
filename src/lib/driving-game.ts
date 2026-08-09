import * as THREE from "three";
import { ENGINE_WORKLET_SOURCE } from "@/lib/engine-worklet-source";
import { TIRE_WORKLET_SOURCE } from "@/lib/tire-worklet-source";

type CameraMode = "Chase" | "Overhead" | "Side";
type ControlName = "left" | "right" | "handbrake";
type DriftPhase = "grip" | "breakaway" | "sustain" | "transition" | "recover";

type Obstacle = {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  resetsCar?: boolean;
};

type DrivingProfile = {
  acceleration: number;
  maximumSpeed: number;
  boostedMaximumSpeed: number;
  inputBuffer: number;
  grip: {
    lateralGrip: number;
    drag: number;
    yawRate: number;
    yawResponse: number;
  };
  drift: {
    minimumSpeed: number;
    breakawayDuration: number;
    breakawayStartAngle: number;
    breakawayEndAngle: number;
    breakawaySteeringAngle: number;
    breakawayImpulse: number;
    sustainBaseAngle: number;
    sustainChargeAngle: number;
    sustainChargeDelay: number;
    sustainChargeDuration: number;
    sustainIntoAngle: number;
    sustainCounterAngle: number;
    minimumAngle: number;
    maximumAngle: number;
    transitionSteerThreshold: number;
    transitionIntentDuration: number;
    transitionDuration: number;
    transitionAngle: number;
    transitionImpulse: number;
    headingAssist: number;
    assistFalloff: number;
    assistFalloffStartAngle: number;
    assistFalloffRange: number;
    steeringYaw: number;
    yawDamping: number;
    maximumYawRate: number;
    lateralGrip: number;
    corneringGrip: number;
    transitionGrip: number;
    drag: number;
    usefulSlipAngle: number;
    normalPenaltyRange: number;
    normalPenalty: number;
    dangerSlipAngle: number;
    dangerPenaltyRange: number;
    dangerPenalty: number;
  };
  recovery: {
    duration: number;
    headingAssist: number;
    yawDamping: number;
    initialGrip: number;
    finalGrip: number;
    drag: number;
  };
  offRoad: {
    extraDrag: number;
    minimumGrip: number;
  };
  exitBoost: {
    duration: number;
    baseForce: number;
    qualityForce: number;
  };
};

const BALANCED_PROFILE: DrivingProfile = {
  acceleration: 16,
  maximumSpeed: 25,
  boostedMaximumSpeed: 27,
  inputBuffer: 0.2,
  grip: { lateralGrip: 8.2, drag: 0.46, yawRate: 1.15, yawResponse: 10 },
  drift: {
    minimumSpeed: 6.2,
    breakawayDuration: 0.16,
    breakawayStartAngle: 12,
    breakawayEndAngle: 20,
    breakawaySteeringAngle: 6,
    breakawayImpulse: 8.5,
    sustainBaseAngle: 15,
    sustainChargeAngle: 6,
    sustainChargeDelay: 0.25,
    sustainChargeDuration: 1.4,
    sustainIntoAngle: 23,
    sustainCounterAngle: 23,
    minimumAngle: 7,
    maximumAngle: 44,
    transitionSteerThreshold: 0.55,
    transitionIntentDuration: 0.1,
    transitionDuration: 0.23,
    transitionAngle: 18,
    transitionImpulse: 3.2,
    headingAssist: 36,
    assistFalloff: 0.38,
    assistFalloffStartAngle: 42,
    assistFalloffRange: 14,
    steeringYaw: 1.8,
    yawDamping: 7.2,
    maximumYawRate: 4.2,
    lateralGrip: 0.72,
    corneringGrip: 0.62,
    transitionGrip: 0.52,
    drag: 0.5,
    usefulSlipAngle: 12,
    normalPenaltyRange: 23,
    normalPenalty: 0.46,
    dangerSlipAngle: 40,
    dangerPenaltyRange: 16,
    dangerPenalty: 0.68,
  },
  recovery: { duration: 0.4, headingAssist: 30, yawDamping: 9, initialGrip: 2.2, finalGrip: 9.6, drag: 0.3 },
  offRoad: { extraDrag: 0.18, minimumGrip: 3.2 },
  exitBoost: { duration: 0.7, baseForce: 3.5, qualityForce: 6 },
};

const DRIVING_PROFILES = {
  balanced: BALANCED_PROFILE,
  loose: {
    ...BALANCED_PROFILE,
    grip: { ...BALANCED_PROFILE.grip, lateralGrip: 7.3, yawRate: 1.25 },
    drift: {
      ...BALANCED_PROFILE.drift,
      minimumSpeed: 5.2,
      sustainBaseAngle: 18,
      maximumAngle: 49,
      headingAssist: 40,
      normalPenalty: 0.35,
      dangerPenalty: 0.58,
    },
    recovery: { ...BALANCED_PROFILE.recovery, duration: 0.48, finalGrip: 8.7 },
  },
  technical: {
    ...BALANCED_PROFILE,
    acceleration: 17,
    maximumSpeed: 26,
    grip: { ...BALANCED_PROFILE.grip, lateralGrip: 9.3, yawRate: 1.08 },
    drift: {
      ...BALANCED_PROFILE.drift,
      minimumSpeed: 7,
      maximumAngle: 40,
      headingAssist: 31,
      transitionDuration: 0.19,
      normalPenalty: 0.55,
      dangerPenalty: 0.82,
    },
    recovery: { ...BALANCED_PROFILE.recovery, duration: 0.32, finalGrip: 10.5 },
  },
} satisfies Record<string, DrivingProfile>;

type DrivingProfileName = keyof typeof DRIVING_PROFILES;

// Internal tuning switch: change this value to compare handling presets.
const ACTIVE_DRIVING_PROFILE: DrivingProfileName = "balanced";
const DRIVING = DRIVING_PROFILES[ACTIVE_DRIVING_PROFILE];

const UP = new THREE.Vector3(0, 1, 0);
const WORLD_LIMIT = 150;
const CAR_RADIUS = 1.25;

export function startDrivingGame(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>("#game-canvas");
  const cameraNode = root.querySelector<HTMLElement>("#camera-mode");
  const intro = root.querySelector<HTMLElement>("#intro");
  const startButton = root.querySelector<HTMLButtonElement>("#start-driving");
  const pauseOverlay = root.querySelector<HTMLElement>("#pause-overlay");
  const pauseButton = root.querySelector<HTMLButtonElement>("#pause-button");
  const resumeButton = root.querySelector<HTMLButtonElement>("#resume-driving");
  if (!canvas || !cameraNode || !intro || !startButton || !pauseOverlay || !pauseButton || !resumeButton) return;
  const cameraDisplay = cameraNode;
  const gameCanvas = canvas;
  const pauseLayer = pauseOverlay;
  const pauseControl = pauseButton;
  const resumeControl = resumeButton;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa9d8ef);
  scene.fog = new THREE.Fog(0xa9d8ef, 175, 300);

  const perspectiveCamera = new THREE.PerspectiveCamera(60, 1, 0.1, 350);
  const overheadCamera = new THREE.OrthographicCamera(-20, 20, 20, -20, 0.1, 350);
  const sideCamera = new THREE.OrthographicCamera(-17, 17, 12, -12, 0.1, 300);
  let cameraMode: CameraMode = "Chase";
  const cameraModes: CameraMode[] = ["Chase", "Overhead", "Side"];

  scene.add(new THREE.HemisphereLight(0xe8f6ff, 0x496a34, 2.2));
  const sun = new THREE.DirectionalLight(0xfff1cf, 3.1);
  sun.position.set(-35, 55, -25);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -155;
  sun.shadow.camera.right = 155;
  sun.shadow.camera.top = 155;
  sun.shadow.camera.bottom = -155;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 240;
  scene.add(sun);

  const obstacles: Obstacle[] = [];
  const world = buildWorld(scene, obstacles);
  const car = createCar();
  scene.add(car.group);
  const driftSmoke = createDriftSmoke(scene);
  const skidMarks = createSkidMarks(scene);

  const position = world.spawnPosition.clone();
  const velocity = new THREE.Vector3();
  let heading = Math.PI / 2;
  let steeringVisual = 0;
  let cameraShake = 0;
  let driftPhase: DriftPhase = "grip";
  let driftDirection = 0;
  let driftTime = 0;
  let phaseTime = 0;
  let yawVelocity = 0;
  let driftInputBuffer = 0;
  let transitionIntentTime = 0;
  let transitionStartSlip = 0;
  let driftEntrySpeed = 0;
  let driftStayedOnPavement = true;
  let exitBoost = 0;
  let exitBoostForce = 0;
  let exitPulse = 0;
  let visualSlip = 0;
  let bodyKick = 0;
  let previousHandbrake = false;
  let carAudio: CarAudio | null = null;
  let running = false;
  let paused = false;
  let destroyed = false;

  const controls: Record<ControlName, boolean> = {
    left: false,
    right: false,
    handbrake: false,
  };

  const keyMap: Record<string, ControlName | undefined> = {
    ArrowLeft: "left",
    KeyA: "left",
    ArrowRight: "right",
    KeyD: "right",
    Space: "handbrake",
  };

  function clearControls() {
    for (const key of Object.keys(controls) as ControlName[]) controls[key] = false;
    root.querySelectorAll("[data-control]").forEach((node) => node.classList.remove("is-active"));
  }

  function setPaused(nextPaused: boolean) {
    if (!running) return;
    paused = nextPaused;
    clearControls();
    carAudio?.setPaused(paused);
    pauseLayer.classList.toggle("is-visible", paused);
    pauseLayer.setAttribute("aria-hidden", String(!paused));
    pauseControl.setAttribute("aria-pressed", String(paused));
    if (paused) resumeControl.focus();
    else gameCanvas.focus();
  }

  function resetCar() {
    position.copy(world.spawnPosition);
    velocity.set(0, 0, 0);
    heading = world.spawnHeading;
    driftPhase = "grip";
    driftDirection = 0;
    driftTime = 0;
    phaseTime = 0;
    yawVelocity = 0;
    driftInputBuffer = 0;
    transitionIntentTime = 0;
    transitionStartSlip = 0;
    driftEntrySpeed = 0;
    driftStayedOnPavement = true;
    exitBoost = 0;
    exitBoostForce = 0;
    exitPulse = 0;
    visualSlip = 0;
    bodyKick = 0;
    cameraShake = 0;
    skidMarks.reset();
    car.group.position.copy(position);
    car.group.rotation.set(0, heading, 0);
  }

  function switchCamera() {
    const index = (cameraModes.indexOf(cameraMode) + 1) % cameraModes.length;
    cameraMode = cameraModes[index];
    cameraDisplay.textContent = cameraMode;
  }

  function onKey(event: KeyboardEvent, pressed: boolean) {
    const control = keyMap[event.code];
    if (control) {
      controls[control] = pressed;
      event.preventDefault();
    }
    if (!pressed && event.code === "KeyC") switchCamera();
    if (!pressed && event.code === "KeyR") resetCar();
    if (!pressed && (event.code === "KeyP" || event.code === "Escape")) {
      event.preventDefault();
      setPaused(!paused);
    }
  }

  window.addEventListener("keydown", (event) => onKey(event, true));
  window.addEventListener("keyup", (event) => onKey(event, false));
  window.addEventListener("blur", clearControls);

  root.querySelectorAll<HTMLElement>("[data-control]").forEach((button) => {
    const name = button.dataset.control as ControlName;
    const setPressed = (pressed: boolean, event: Event) => {
      event.preventDefault();
      controls[name] = pressed;
      button.classList.toggle("is-active", pressed);
    };
    button.addEventListener("pointerdown", (event) => {
      button.setPointerCapture(event.pointerId);
      setPressed(true, event);
    });
    button.addEventListener("pointerup", (event) => setPressed(false, event));
    button.addEventListener("pointercancel", (event) => setPressed(false, event));
  });

  root.querySelector("#camera-button")?.addEventListener("click", switchCamera);
  root.querySelector("#reset-button")?.addEventListener("click", resetCar);
  pauseButton.addEventListener("click", () => setPaused(true));
  resumeButton.addEventListener("click", () => setPaused(false));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && running && !paused) setPaused(true);
  });
  startButton.addEventListener("click", () => {
    running = true;
    paused = false;
    carAudio ??= createCarAudio();
    carAudio?.setPaused(false);
    intro.classList.add("is-hidden");
    canvas.focus();
  });

  function updateCar(dt: number) {
    let forward = new THREE.Vector3(Math.sin(heading), 0, Math.cos(heading));
    let forwardSpeed = velocity.dot(forward);
    const speed = velocity.length();
    const steer = Number(controls.left) - Number(controls.right);
    const handbrakePressed = controls.handbrake && !previousHandbrake;
    const onPavement = world.isOnPavement(position);

    // A short buffer makes pressing Drift just before steering feel intentional rather than missed.
    if (handbrakePressed) driftInputBuffer = DRIVING.inputBuffer;
    else driftInputBuffer = Math.max(0, driftInputBuffer - dt);
    previousHandbrake = controls.handbrake;

    const canBreakAway = speed > DRIVING.drift.minimumSpeed && Math.abs(steer) > 0.16;
    if (driftPhase === "grip" && canBreakAway && (controls.handbrake || driftInputBuffer > 0)) {
      driftPhase = "breakaway";
      driftDirection = Math.sign(steer);
      driftTime = 0;
      phaseTime = 0;
      transitionIntentTime = 0;
      driftEntrySpeed = speed;
      driftStayedOnPavement = onPavement;
      bodyKick = 1;
      cameraShake = Math.max(cameraShake, 0.075);
      driftInputBuffer = 0;
    }

    // Releasing Drift always means hook-up. This keeps the mechanic predictable.
    if (driftPhase !== "grip" && driftPhase !== "recover" && !controls.handbrake) {
      driftPhase = "recover";
      phaseTime = 0;
      transitionIntentTime = 0;
    }

    phaseTime += dt;
    if (driftPhase === "breakaway" || driftPhase === "sustain" || driftPhase === "transition") driftTime += dt;
    if (driftPhase !== "grip") driftStayedOnPavement &&= onPavement;

    // Throttle is always on: the game is about choosing a line, not managing pedals.
    velocity.addScaledVector(forward, DRIVING.acceleration * dt);
    if (exitBoost > 0) {
      const boostEnvelope = Math.sin((exitBoost / DRIVING.exitBoost.duration) * Math.PI);
      velocity.addScaledVector(forward, exitBoostForce * boostEnvelope * dt);
      exitBoost = Math.max(0, exitBoost - dt);
    }
    exitPulse = Math.max(0, exitPulse - dt * 2.3);
    bodyKick = Math.max(0, bodyKick - dt * 5.5);

    forwardSpeed = velocity.dot(forward);
    const currentSpeed = velocity.length();
    const speedRatio = THREE.MathUtils.clamp(Math.abs(forwardSpeed) / 12, 0.12, 1);
    const velocityHeading = currentSpeed > 0.4 ? Math.atan2(velocity.x, velocity.z) : heading;
    const currentSlip = angleDifference(heading, velocityHeading);
    const currentSlipDegrees = Math.abs(THREE.MathUtils.radToDeg(currentSlip));
    let grip = DRIVING.grip.lateralGrip;
    let drag = DRIVING.grip.drag;

    if (driftPhase === "grip") {
      // Grip steering is deliberately wider at speed; drifting is the tool for tight corners.
      const targetYawVelocity = steer * DRIVING.grip.yawRate * speedRatio;
      yawVelocity = THREE.MathUtils.lerp(
        yawVelocity,
        targetYawVelocity,
        1 - Math.exp(-DRIVING.grip.yawResponse * dt),
      );
    } else if (driftPhase === "breakaway" || driftPhase === "sustain" || driftPhase === "transition") {
      let targetSlip = 0;
      let setImpulse = 0;

      if (driftPhase === "breakaway") {
        const setProgress = THREE.MathUtils.clamp(phaseTime / DRIVING.drift.breakawayDuration, 0, 1);
        const targetDegrees = THREE.MathUtils.lerp(
          DRIVING.drift.breakawayStartAngle,
          DRIVING.drift.breakawayEndAngle,
          setProgress,
        ) + Math.max(0, steer * driftDirection) * DRIVING.drift.breakawaySteeringAngle;
        targetSlip = THREE.MathUtils.degToRad(-driftDirection * targetDegrees);
        setImpulse = driftDirection * DRIVING.drift.breakawayImpulse * (1 - setProgress) * speedRatio;
        if (phaseTime >= DRIVING.drift.breakawayDuration) {
          driftPhase = "sustain";
          phaseTime = 0;
        }
      } else if (driftPhase === "sustain") {
        const intoDrift = steer * driftDirection;
        const holdCharge = THREE.MathUtils.clamp(
          (driftTime - DRIVING.drift.sustainChargeDelay) / DRIVING.drift.sustainChargeDuration,
          0,
          1,
        ) * DRIVING.drift.sustainChargeAngle;
        const targetDegrees = THREE.MathUtils.clamp(
          DRIVING.drift.sustainBaseAngle
            + holdCharge
            + Math.max(0, intoDrift) * DRIVING.drift.sustainIntoAngle
            - Math.max(0, -intoDrift) * DRIVING.drift.sustainCounterAngle,
          DRIVING.drift.minimumAngle,
          DRIVING.drift.maximumAngle,
        );
        targetSlip = THREE.MathUtils.degToRad(-driftDirection * targetDegrees);

        if (intoDrift < -DRIVING.drift.transitionSteerThreshold) transitionIntentTime += dt;
        else transitionIntentTime = Math.max(0, transitionIntentTime - dt * 2);
        if (transitionIntentTime >= DRIVING.drift.transitionIntentDuration) {
          driftPhase = "transition";
          phaseTime = 0;
          transitionIntentTime = 0;
          transitionStartSlip = currentSlip;
          bodyKick = 0.45;
        }
      } else {
        const transitionProgress = THREE.MathUtils.smoothstep(
          phaseTime / DRIVING.drift.transitionDuration,
          0,
          1,
        );
        const nextDirection = -driftDirection;
        const nextSlip = THREE.MathUtils.degToRad(-nextDirection * DRIVING.drift.transitionAngle);
        targetSlip = THREE.MathUtils.lerp(transitionStartSlip, nextSlip, transitionProgress);
        setImpulse = nextDirection * Math.sin(transitionProgress * Math.PI) * DRIVING.drift.transitionImpulse;
        if (phaseTime >= DRIVING.drift.transitionDuration) {
          driftDirection = nextDirection;
          driftPhase = "sustain";
          phaseTime = 0;
        }
      }

      const desiredHeading = velocityHeading - targetSlip;
      const headingError = angleDifference(heading, desiredHeading);
      const assistFalloff = THREE.MathUtils.lerp(
        1,
        DRIVING.drift.assistFalloff,
        THREE.MathUtils.clamp(
          (currentSlipDegrees - DRIVING.drift.assistFalloffStartAngle) / DRIVING.drift.assistFalloffRange,
          0,
          1,
        ),
      );
      const yawAcceleration = headingError * DRIVING.drift.headingAssist * assistFalloff
        + steer * DRIVING.drift.steeringYaw
        + setImpulse
        - yawVelocity * DRIVING.drift.yawDamping;
      yawVelocity += yawAcceleration * dt;
      yawVelocity = THREE.MathUtils.clamp(
        yawVelocity,
        -DRIVING.drift.maximumYawRate,
        DRIVING.drift.maximumYawRate,
      );
      const corneringDemand = Math.max(0, steer * driftDirection);
      grip = driftPhase === "transition"
        ? DRIVING.drift.transitionGrip
        : DRIVING.drift.lateralGrip + corneringDemand * DRIVING.drift.corneringGrip;

      // Shallow drifts preserve speed. Big, spectacular angles remain possible but cost momentum.
      const usefulSlip = Math.max(0, currentSlipDegrees - DRIVING.drift.usefulSlipAngle);
      const normalPenalty = THREE.MathUtils.clamp(usefulSlip / DRIVING.drift.normalPenaltyRange, 0, 1);
      const dangerPenalty = THREE.MathUtils.clamp(
        (currentSlipDegrees - DRIVING.drift.dangerSlipAngle) / DRIVING.drift.dangerPenaltyRange,
        0,
        1,
      );
      drag = DRIVING.drift.drag
        + normalPenalty * normalPenalty * DRIVING.drift.normalPenalty
        + dangerPenalty * dangerPenalty * DRIVING.drift.dangerPenalty;
    } else {
      // Hook-up progressively aligns the body and velocity rather than snapping either one.
      const headingError = angleDifference(heading, velocityHeading);
      const recoveryProgress = THREE.MathUtils.clamp(phaseTime / DRIVING.recovery.duration, 0, 1);
      yawVelocity += (
        headingError * DRIVING.recovery.headingAssist
        - yawVelocity * DRIVING.recovery.yawDamping
      ) * dt;
      grip = THREE.MathUtils.lerp(
        DRIVING.recovery.initialGrip,
        DRIVING.recovery.finalGrip,
        recoveryProgress,
      );
      drag = DRIVING.recovery.drag;

      if (phaseTime >= DRIVING.recovery.duration || Math.abs(headingError) < THREE.MathUtils.degToRad(2.5)) {
        const alignment = 1 - THREE.MathUtils.clamp(currentSlipDegrees / 14, 0, 1);
        const duration = THREE.MathUtils.clamp((driftTime - 0.35) / 1.35, 0, 1);
        const retention = THREE.MathUtils.clamp(currentSpeed / Math.max(driftEntrySpeed, 1), 0.6, 1) - 0.6;
        const roadBonus = driftStayedOnPavement ? 1 : 0.35;
        const exitQuality = alignment * (0.45 + duration * 0.55) * (0.65 + retention * 0.875) * roadBonus;
        if (exitQuality > 0.12 && driftTime > 0.45) {
          exitBoost = DRIVING.exitBoost.duration;
          exitBoostForce = DRIVING.exitBoost.baseForce + exitQuality * DRIVING.exitBoost.qualityForce;
          exitPulse = exitQuality;
        }
        driftPhase = "grip";
        driftDirection = 0;
        driftTime = 0;
        phaseTime = 0;
        yawVelocity *= 0.35;
      }
    }

    heading = normalizeAngle(heading + yawVelocity * dt);

    if (!onPavement) {
      drag += DRIVING.offRoad.extraDrag;
      grip = Math.max(grip, DRIVING.offRoad.minimumGrip);
    }

    forward = new THREE.Vector3(Math.sin(heading), 0, Math.cos(heading));
    const right = new THREE.Vector3(forward.z, 0, -forward.x);
    forwardSpeed = velocity.dot(forward);
    const lateralSpeed = velocity.dot(right);
    velocity.copy(forward.clone().multiplyScalar(forwardSpeed)).add(right.multiplyScalar(lateralSpeed * Math.exp(-grip * dt)));
    velocity.multiplyScalar(Math.exp(-drag * dt));
    const maximumSpeed = exitBoost > 0 ? DRIVING.boostedMaximumSpeed : DRIVING.maximumSpeed;
    if (velocity.length() > maximumSpeed) velocity.setLength(maximumSpeed);

    const distance = velocity.length() * dt;
    const steps = Math.max(1, Math.ceil(distance / 0.7));
    for (let i = 0; i < steps; i++) {
      position.addScaledVector(velocity, dt / steps);
      resolveCollisions();
    }

    const finalSpeed = velocity.length();
    const finalVelocityHeading = finalSpeed > 0.4 ? Math.atan2(velocity.x, velocity.z) : heading;
    visualSlip = angleDifference(heading, finalVelocityHeading);
    const slipIntensity = THREE.MathUtils.clamp((Math.abs(THREE.MathUtils.radToDeg(visualSlip)) - 5) / 30, 0, 1)
      * THREE.MathUtils.clamp(finalSpeed / 10, 0, 1);

    steeringVisual = THREE.MathUtils.lerp(steeringVisual, steer * 0.48, 1 - Math.exp(-12 * dt));
    const transitionSettle = driftPhase === "transition"
      ? Math.abs(phaseTime / DRIVING.drift.transitionDuration - 0.5) * 2
      : 1;
    const targetRoll = THREE.MathUtils.clamp(
      (-steer * 0.025 + visualSlip * 0.12) * transitionSettle,
      -0.075,
      0.075,
    );
    const targetPitch = bodyKick * 0.035 - exitPulse * 0.025;
    car.group.position.copy(position);
    car.group.rotation.y = heading;
    car.group.rotation.z = THREE.MathUtils.lerp(car.group.rotation.z, targetRoll, 1 - Math.exp(-7 * dt));
    car.group.rotation.x = THREE.MathUtils.lerp(car.group.rotation.x, targetPitch, 1 - Math.exp(-9 * dt));
    car.frontWheels.forEach((wheel) => (wheel.rotation.y = steeringVisual));
    const wheelSpin = forwardSpeed * dt / 0.42;
    car.wheels.forEach((wheel) => (wheel.rotation.x += wheelSpin));
    car.brakeLights.forEach((light) => {
      const material = light.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = controls.handbrake ? 5 : 1.2;
    });

    driftSmoke.update(dt, position, heading, slipIntensity, finalSpeed);
    skidMarks.update(position, heading, slipIntensity, distance);
    carAudio?.update({
      dt,
      speed: finalSpeed,
      signedSlipDegrees: THREE.MathUtils.radToDeg(visualSlip),
      steeringLoad: Math.abs(steer) * THREE.MathUtils.clamp(finalSpeed / 14, 0, 1),
      steerDirection: steer,
      phase: driftPhase,
      onPavement,
      boosting: exitBoost > 0,
    });
  }

  function resolveCollisions() {
    for (const box of obstacles) {
      const closestX = THREE.MathUtils.clamp(position.x, box.minX, box.maxX);
      const closestZ = THREE.MathUtils.clamp(position.z, box.minZ, box.maxZ);
      let dx = position.x - closestX;
      let dz = position.z - closestZ;
      let distanceSq = dx * dx + dz * dz;
      if (distanceSq >= CAR_RADIUS * CAR_RADIUS) continue;

      if (distanceSq < 0.0001) {
        const choices = [
          { distance: Math.abs(position.x - box.minX), x: -1, z: 0 },
          { distance: Math.abs(box.maxX - position.x), x: 1, z: 0 },
          { distance: Math.abs(position.z - box.minZ), x: 0, z: -1 },
          { distance: Math.abs(box.maxZ - position.z), x: 0, z: 1 },
        ].sort((a, b) => a.distance - b.distance);
        dx = choices[0].x;
        dz = choices[0].z;
        distanceSq = 1;
      }

      if (box.resetsCar) {
        carAudio?.impact(Math.min(1, velocity.length() / 18));
        resetCar();
        return;
      }

      const distance = Math.sqrt(distanceSq);
      const nx = dx / distance;
      const nz = dz / distance;
      position.x += nx * (CAR_RADIUS - distance);
      position.z += nz * (CAR_RADIUS - distance);
      const impact = velocity.x * nx + velocity.z * nz;
      if (impact < 0) {
        if (Math.abs(impact) > 3) carAudio?.impact(Math.min(1, Math.abs(impact) / 14));
        cameraShake = Math.min(0.5, cameraShake + Math.abs(impact) * 0.025);
        velocity.x -= nx * impact * 1.35;
        velocity.z -= nz * impact * 1.35;
        velocity.multiplyScalar(0.58);
      }
    }

    const limit = WORLD_LIMIT - CAR_RADIUS;
    if (Math.abs(position.x) > limit || Math.abs(position.z) > limit) {
      carAudio?.impact(Math.min(1, velocity.length() / 18));
      resetCar();
    }
  }

  const lookTarget = position.clone();
  const cameraPosition = new THREE.Vector3();
  function updateCamera(dt: number) {
    const follow = 1 - Math.exp(-6 * dt);
    const forward = new THREE.Vector3(Math.sin(heading), 0, Math.cos(heading));
    const speed = velocity.length();
    const velocityDirection = speed > 0.5 ? velocity.clone().normalize() : forward.clone();
    const slipBlend = THREE.MathUtils.clamp(Math.abs(visualSlip) / THREE.MathUtils.degToRad(30), 0, 1) * 0.35;
    const cameraForward = forward.clone().lerp(velocityDirection, slipBlend).normalize();
    const speedRatio = THREE.MathUtils.clamp(speed / DRIVING.maximumSpeed, 0, 1);
    const speedLead = velocity.clone().multiplyScalar(0.045);
    lookTarget.lerp(position.clone().add(speedLead).add(new THREE.Vector3(0, 1, 0)), follow);

    const targetFov = 60 + speedRatio * 4 + slipBlend * 2 + exitPulse * 3;
    const nextFov = THREE.MathUtils.lerp(perspectiveCamera.fov, targetFov, 1 - Math.exp(-4 * dt));
    if (Math.abs(nextFov - perspectiveCamera.fov) > 0.01) {
      perspectiveCamera.fov = nextFov;
      perspectiveCamera.updateProjectionMatrix();
    }

    if (cameraMode === "Chase") {
      const cameraDistance = 5 + speedRatio * 0.5 + exitPulse * 0.2;
      const cameraHeight = 2 + speedRatio * 0.15;
      const targetPosition = position
        .clone()
        .addScaledVector(cameraForward, -cameraDistance)
        .add(new THREE.Vector3(0, cameraHeight, 0));
      cameraPosition.lerp(targetPosition, 1 - Math.exp(-4.5 * dt));
      perspectiveCamera.position.copy(cameraPosition);
      if (cameraShake > 0.001) {
        perspectiveCamera.position.x += (Math.random() - 0.5) * cameraShake;
        perspectiveCamera.position.y += (Math.random() - 0.5) * cameraShake;
      }
      perspectiveCamera.lookAt(lookTarget);
    } else if (cameraMode === "Overhead") {
      const targetPosition = position.clone().add(new THREE.Vector3(0, 42, 0.01));
      overheadCamera.position.lerp(targetPosition, follow);
      overheadCamera.up.set(0, 0, -1);
      overheadCamera.lookAt(position);
    } else {
      const targetPosition = position.clone().add(new THREE.Vector3(30, 15, 0));
      sideCamera.position.lerp(targetPosition, follow);
      sideCamera.up.copy(UP);
      sideCamera.lookAt(lookTarget);
    }
    cameraShake *= Math.exp(-9 * dt);
  }

  function activeCamera(): THREE.Camera {
    if (cameraMode === "Overhead") return overheadCamera;
    if (cameraMode === "Side") return sideCamera;
    return perspectiveCamera;
  }

  function resize() {
    const width = root.clientWidth;
    const height = root.clientHeight;
    renderer.setSize(width, height, false);
    perspectiveCamera.aspect = width / height;
    perspectiveCamera.updateProjectionMatrix();

    const aspect = width / height;
    const overheadSize = 20;
    overheadCamera.left = -overheadSize * aspect;
    overheadCamera.right = overheadSize * aspect;
    overheadCamera.top = overheadSize;
    overheadCamera.bottom = -overheadSize;
    overheadCamera.updateProjectionMatrix();

    const sideSize = 12;
    sideCamera.left = -sideSize * aspect;
    sideCamera.right = sideSize * aspect;
    sideCamera.top = sideSize;
    sideCamera.bottom = -sideSize;
    sideCamera.updateProjectionMatrix();
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(root);
  resize();
  resetCar();
  updateCamera(1);

  let lastTime = performance.now();
  function frame(now: number) {
    if (destroyed) return;
    const elapsed = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    if (running && !paused) updateCar(elapsed);
    updateCamera(elapsed);
    renderer.render(scene, activeCamera());
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  document.addEventListener("astro:before-swap", () => {
    destroyed = true;
    resizeObserver.disconnect();
    carAudio?.destroy();
    renderer.dispose();
  }, { once: true });
}

function normalizeAngle(angle: number) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

function angleDifference(from: number, to: number) {
  return normalizeAngle(to - from);
}

function buildWorld(scene: THREE.Scene, obstacles: Obstacle[]) {
  const grassMaterial = new THREE.MeshStandardMaterial({ color: 0x729f53, roughness: 1 });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), grassMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x343a3d, roughness: 0.92 });
  const cityRoads = [-60, -30, 0, 30, 60];
  const roadSegments = [
    ...cityRoads.map((z) => ({ x: 0, z, w: 150, d: 16 })),
    ...cityRoads.map((x) => ({ x, z: 0, w: 16, d: x === 0 ? 240 : 150 })),
  ];
  const course = buildDriftCircuit(scene, roadMaterial);

  roadSegments.forEach((road) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(road.w, 0.12, road.d), roadMaterial);
    mesh.position.set(road.x, 0.04, road.z);
    mesh.receiveShadow = true;
    scene.add(mesh);
  });

  const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xf5d66b });
  for (const z of cityRoads) {
    for (let x = -70; x <= 70; x += 7) addRoadMark(scene, x, z, 3.3, 0.12, lineMaterial);
  }
  for (const x of cityRoads) {
    const extent = x === 0 ? 112 : 70;
    for (let z = -extent; z <= extent; z += 7) addRoadMark(scene, x, z, 0.12, 3.3, lineMaterial);
  }

  // Four open blocks provide forgiving drift lots between the denser streets.
  const parkingLots = [
    [-15, -15], [15, -15], [-15, 15], [15, 15],
  ];
  parkingLots.forEach(([x, z]) => {
    const lot = new THREE.Mesh(new THREE.BoxGeometry(14, 0.1, 14), roadMaterial);
    lot.position.set(x, 0.04, z);
    lot.receiveShadow = true;
    scene.add(lot);
  });

  const buildings = [
    [-45, -45, 12, 12, 9, 0xe26d5a],
    [-15, -45, 13, 12, 14, 0xe7b45a],
    [15, -45, 12, 12, 8, 0x5f83a8],
    [45, -45, 13, 12, 16, 0xb2789b],
    [-45, -15, 12, 13, 13, 0xd98750],
    [45, -15, 12, 13, 10, 0x718977],
    [-45, 15, 12, 12, 8, 0x8579aa],
    [45, 15, 13, 12, 15, 0xd0a44c],
    [-45, 45, 12, 13, 17, 0xc66558],
    [-15, 45, 13, 12, 10, 0x638aa0],
    [15, 45, 12, 13, 13, 0xd6a75d],
    [45, 45, 13, 13, 9, 0x6d82a1],
  ] as const;
  buildings.forEach(([x, z, w, d, h, color]) => addBuilding(scene, obstacles, x, z, w, d, h, color));

  const treePositions = [
    [-21, -21], [21, -21], [-21, 21], [21, 21],
    [-72, -72], [72, -72], [-72, 72], [72, 72],
  ];
  treePositions.forEach(([x, z]) => addTree(scene, obstacles, x, z));

  // Low barriers create two optional slalom lines through the central drift lots.
  for (let i = 0; i < 4; i++) {
    addBarrier(scene, obstacles, 10 + i * 3.4, -17 + (i % 2) * 4);
    addBarrier(scene, obstacles, -20 + i * 3.4, 13 + (i % 2) * 4);
  }

  const spawnPosition = course.points[0].clone();
  spawnPosition.y = 0.06;
  const spawnTangent = course.tangents[0];
  return {
    spawnPosition,
    spawnHeading: Math.atan2(spawnTangent.x, spawnTangent.z),
    isOnPavement(position: THREE.Vector3) {
      const onCityRoad = roadSegments.some((road) =>
        Math.abs(position.x - road.x) <= road.w / 2 && Math.abs(position.z - road.z) <= road.d / 2
      );
      const onParkingLot = parkingLots.some(([x, z]) =>
        Math.abs(position.x - x) <= 7 && Math.abs(position.z - z) <= 7
      );
      if (onCityRoad || onParkingLot) return true;

      let nearestIndex = 0;
      let nearestDistanceSq = Number.POSITIVE_INFINITY;
      for (let i = 0; i < course.points.length; i++) {
        const dx = position.x - course.points[i].x;
        const dz = position.z - course.points[i].z;
        const distanceSq = dx * dx + dz * dz;
        if (distanceSq < nearestDistanceSq) {
          nearestDistanceSq = distanceSq;
          nearestIndex = i;
        }
      }
      return nearestDistanceSq <= (course.widths[nearestIndex] * 0.5) ** 2;
    },
  };
}

type DrivingPhrase = {
  kind: "acceleration" | "sweeper" | "tightening" | "transition" | "cooldown" | "hairpin";
  span: number;
  radius: number;
  width: number;
};

function buildDriftCircuit(scene: THREE.Scene, roadMaterial: THREE.Material) {
  // The grammar controls rhythm around a guaranteed non-intersecting polar loop.
  // Radius changes create linked transitions; angular spacing controls how long the player has to set and recover.
  const grammar: DrivingPhrase[] = [
    { kind: "acceleration", span: 0.7, radius: 114, width: 11 },
    { kind: "sweeper", span: 0.5, radius: 124, width: 12 },
    { kind: "tightening", span: 0.42, radius: 108, width: 14 },
    { kind: "cooldown", span: 0.65, radius: 121, width: 11 },
    { kind: "transition", span: 0.42, radius: 111, width: 14 },
    { kind: "sweeper", span: 0.5, radius: 127, width: 12.5 },
    { kind: "hairpin", span: 0.4, radius: 107, width: 15 },
    { kind: "acceleration", span: 0.7, radius: 120, width: 11 },
    { kind: "sweeper", span: 0.5, radius: 126, width: 12 },
    { kind: "transition", span: 0.42, radius: 109, width: 14.5 },
    { kind: "tightening", span: 0.45, radius: 123, width: 14 },
    { kind: "cooldown", span: 0.65, radius: 112, width: 11 },
    { kind: "sweeper", span: 0.5, radius: 127, width: 12.5 },
    { kind: "transition", span: 0.42, radius: 110, width: 14 },
  ];

  const totalSpan = grammar.reduce((sum, phrase) => sum + phrase.span, 0);
  let angle = -Math.PI / 2;
  const anchors: THREE.Vector3[] = [];
  for (const phrase of grammar) {
    anchors.push(new THREE.Vector3(Math.cos(angle) * phrase.radius, 0.105, Math.sin(angle) * phrase.radius));
    angle += phrase.span / totalSpan * Math.PI * 2;
  }

  const curve = new THREE.CatmullRomCurve3(anchors, true, "centripetal", 0.5);
  const sampleCount = 336;
  const points: THREE.Vector3[] = [];
  const tangents: THREE.Vector3[] = [];
  const widths: number[] = [];
  for (let i = 0; i < sampleCount; i++) {
    const t = i / sampleCount;
    points.push(curve.getPointAt(t));
    tangents.push(curve.getTangentAt(t).setY(0).normalize());
    const phrasePosition = t * grammar.length;
    const phraseIndex = Math.floor(phrasePosition) % grammar.length;
    const nextIndex = (phraseIndex + 1) % grammar.length;
    widths.push(THREE.MathUtils.lerp(grammar[phraseIndex].width, grammar[nextIndex].width, phrasePosition % 1));
  }

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  for (let i = 0; i < sampleCount; i++) {
    const point = points[i];
    const tangent = tangents[i];
    const right = new THREE.Vector3(tangent.z, 0, -tangent.x);
    const halfWidth = widths[i] / 2;
    const edgeA = point.clone().addScaledVector(right, halfWidth);
    const edgeB = point.clone().addScaledVector(right, -halfWidth);
    positions.push(edgeA.x, edgeA.y, edgeA.z, edgeB.x, edgeB.y, edgeB.z);
    uvs.push(0, i / 12, 1, i / 12);

    const next = (i + 1) % sampleCount;
    const a = i * 2;
    const b = a + 1;
    const c = next * 2;
    const d = c + 1;
    indices.push(a, b, d, a, d, c);
  }

  const roadGeometry = new THREE.BufferGeometry();
  roadGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  roadGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  roadGeometry.setIndex(indices);
  roadGeometry.computeVertexNormals();
  const road = new THREE.Mesh(roadGeometry, roadMaterial);
  road.receiveShadow = true;
  scene.add(road);

  const markerMatrix = new THREE.Matrix4();
  const markerQuaternion = new THREE.Quaternion();
  const markerScale = new THREE.Vector3(1, 1, 1);

  // Alternating curbs make entries, apexes, and exits easy to read at speed.
  const curbGeometry = new THREE.BoxGeometry(0.62, 0.1, 1.55);
  const redCurbs = new THREE.InstancedMesh(
    curbGeometry,
    new THREE.MeshStandardMaterial({ color: 0xd94b43, roughness: 0.82 }),
    sampleCount / 4,
  );
  const whiteCurbs = new THREE.InstancedMesh(
    curbGeometry,
    new THREE.MeshStandardMaterial({ color: 0xf4ead8, roughness: 0.82 }),
    sampleCount / 4,
  );
  let redIndex = 0;
  let whiteIndex = 0;
  for (let i = 0; i < sampleCount; i += 4) {
    const tangent = tangents[i];
    const right = new THREE.Vector3(tangent.z, 0, -tangent.x);
    markerQuaternion.setFromAxisAngle(UP, Math.atan2(tangent.x, tangent.z));
    for (const side of [-1, 1]) {
      const curbPosition = points[i].clone().addScaledVector(right, side * (widths[i] / 2 - 0.18));
      curbPosition.y = 0.16;
      markerMatrix.compose(curbPosition, markerQuaternion, markerScale);
      const useRed = (i / 4 + (side > 0 ? 1 : 0)) % 2 === 0;
      if (useRed) redCurbs.setMatrixAt(redIndex++, markerMatrix);
      else whiteCurbs.setMatrixAt(whiteIndex++, markerMatrix);
    }
  }
  redCurbs.castShadow = true;
  whiteCurbs.castShadow = true;
  redCurbs.receiveShadow = true;
  whiteCurbs.receiveShadow = true;
  scene.add(redCurbs, whiteCurbs);

  // A restrained dashed guide exposes the route without dictating a racing line.
  const dashStep = 12;
  const dashCount = Math.ceil(sampleCount / dashStep);
  const dashes = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.12, 0.018, 2.15),
    new THREE.MeshBasicMaterial({ color: 0xe9dfac }),
    dashCount,
  );
  for (let i = 0, instance = 0; i < sampleCount; i += dashStep, instance++) {
    const tangent = tangents[i];
    markerQuaternion.setFromAxisAngle(UP, Math.atan2(tangent.x, tangent.z));
    const dashPosition = points[i].clone();
    dashPosition.y = 0.17;
    markerMatrix.compose(dashPosition, markerQuaternion, markerScale);
    dashes.setMatrixAt(instance, markerMatrix);
  }
  scene.add(dashes);

  const startLine = new THREE.Mesh(
    new THREE.BoxGeometry(widths[0] - 1.2, 0.025, 0.7),
    new THREE.MeshBasicMaterial({ color: 0xf4ead8 }),
  );
  startLine.position.copy(points[0]);
  startLine.position.y = 0.18;
  startLine.rotation.y = Math.atan2(tangents[0].x, tangents[0].z);
  scene.add(startLine);

  return { points, tangents, widths };
}

function addRoadMark(scene: THREE.Scene, x: number, z: number, w: number, d: number, material: THREE.Material) {
  const mark = new THREE.Mesh(new THREE.PlaneGeometry(w, d), material);
  mark.rotation.x = -Math.PI / 2;
  mark.position.set(x, 0.115, z);
  scene.add(mark);
}

function addBuilding(
  scene: THREE.Scene,
  obstacles: Obstacle[],
  x: number,
  z: number,
  width: number,
  depth: number,
  height: number,
  color: number,
) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    new THREE.MeshStandardMaterial({ color, roughness: 0.85 }),
  );
  body.position.y = height / 2;
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(width + 0.7, 0.45, depth + 0.7),
    new THREE.MeshStandardMaterial({ color: 0x363b42, roughness: 0.9 }),
  );
  roof.position.y = height + 0.22;
  roof.castShadow = true;
  group.add(roof);

  const windowMaterial = new THREE.MeshStandardMaterial({ color: 0xaee8ef, emissive: 0x204952, emissiveIntensity: 0.5 });
  for (let y = 2.2; y < height - 1; y += 3.1) {
    for (let offset = -width / 2 + 2; offset < width / 2 - 0.5; offset += 3.2) {
      const windowMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.3), windowMaterial);
      windowMesh.position.set(offset, y, depth / 2 + 0.011);
      group.add(windowMesh);
    }
  }
  group.position.set(x, 0, z);
  scene.add(group);
  obstacles.push({
    minX: x - width / 2,
    maxX: x + width / 2,
    minZ: z - depth / 2,
    maxZ: z + depth / 2,
    resetsCar: true,
  });
}

function addTree(scene: THREE.Scene, obstacles: Obstacle[], x: number, z: number) {
  const group = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.62, 3.4, 7),
    new THREE.MeshStandardMaterial({ color: 0x765039, roughness: 1 }),
  );
  trunk.position.y = 1.7;
  trunk.castShadow = true;
  group.add(trunk);
  const crown = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.25, 1),
    new THREE.MeshStandardMaterial({ color: 0x3d753e, roughness: 1, flatShading: true }),
  );
  crown.position.y = 4.5;
  crown.scale.y = 1.15;
  crown.castShadow = true;
  group.add(crown);
  group.position.set(x, 0, z);
  scene.add(group);
  obstacles.push({ minX: x - 0.8, maxX: x + 0.8, minZ: z - 0.8, maxZ: z + 0.8 });
}

function addBarrier(scene: THREE.Scene, obstacles: Obstacle[], x: number, z: number) {
  const barrier = new THREE.Mesh(
    new THREE.BoxGeometry(2.8, 0.75, 0.7),
    new THREE.MeshStandardMaterial({ color: 0xf3eee0, roughness: 0.8 }),
  );
  barrier.position.set(x, 0.42, z);
  barrier.castShadow = true;
  scene.add(barrier);
  obstacles.push({ minX: x - 1.4, maxX: x + 1.4, minZ: z - 0.35, maxZ: z + 0.35 });
}

function createCar() {
  const group = new THREE.Group();
  const red = new THREE.MeshStandardMaterial({ color: 0xe83e37, roughness: 0.58, metalness: 0.08 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x171a1d, roughness: 0.8 });
  const glass = new THREE.MeshStandardMaterial({ color: 0x8fc9dc, roughness: 0.25, metalness: 0.15 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.65, 4.15), red);
  body.position.y = 0.55;
  body.castShadow = true;
  group.add(body);

  const hood = new THREE.Mesh(new THREE.BoxGeometry(2.08, 0.28, 1.35), red);
  hood.position.set(0, 0.93, 1.22);
  hood.castShadow = true;
  group.add(hood);

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.78, 1.75), glass);
  cabin.position.set(0, 1.18, -0.25);
  cabin.castShadow = true;
  group.add(cabin);

  const wheels: THREE.Mesh[] = [];
  const frontWheels: THREE.Mesh[] = [];
  for (const x of [-1.12, 1.12]) {
    for (const z of [-1.25, 1.25]) {
      const pivot = new THREE.Group();
      pivot.position.set(x, 0.43, z);
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.34, 14), dark);
      wheel.rotation.z = Math.PI / 2;
      wheel.castShadow = true;
      pivot.add(wheel);
      group.add(pivot);
      wheels.push(wheel);
      if (z > 0) frontWheels.push(pivot as unknown as THREE.Mesh);
    }
  }

  const brakeMaterial = new THREE.MeshStandardMaterial({ color: 0xff3329, emissive: 0xff160d, emissiveIntensity: 1.2 });
  const brakeLights: THREE.Mesh[] = [];
  for (const x of [-0.72, 0.72]) {
    const light = new THREE.Mesh(new THREE.BoxGeometry(0.43, 0.22, 0.08), brakeMaterial.clone());
    light.position.set(x, 0.72, -2.1);
    group.add(light);
    brakeLights.push(light);
  }

  const headlights = new THREE.MeshBasicMaterial({ color: 0xfff3c2 });
  for (const x of [-0.72, 0.72]) {
    const light = new THREE.Mesh(new THREE.BoxGeometry(0.43, 0.22, 0.08), headlights);
    light.position.set(x, 0.72, 2.1);
    group.add(light);
  }

  group.traverse((object) => {
    if (object instanceof THREE.Mesh) object.castShadow = true;
  });
  return { group, wheels, frontWheels, brakeLights };
}

type SmokeParticle = {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
};

function createDriftSmoke(scene: THREE.Scene) {
  const geometry = new THREE.IcosahedronGeometry(0.34, 1);
  const particles: SmokeParticle[] = [];
  for (let i = 0; i < 32; i++) {
    const material = new THREE.MeshBasicMaterial({
      color: 0xdde2dd,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.visible = false;
    mesh.renderOrder = 2;
    scene.add(mesh);
    particles.push({ mesh, velocity: new THREE.Vector3(), life: 0, maxLife: 1 });
  }

  let cursor = 0;
  let spawnBudget = 0;
  let wheelSide = -1;

  return {
    update(dt: number, carPosition: THREE.Vector3, heading: number, intensity: number, speed: number) {
      for (const particle of particles) {
        if (particle.life <= 0) continue;
        particle.life -= dt;
        if (particle.life <= 0) {
          particle.mesh.visible = false;
          continue;
        }
        const age = 1 - particle.life / particle.maxLife;
        particle.mesh.position.addScaledVector(particle.velocity, dt);
        particle.mesh.position.y += dt * 0.24;
        particle.mesh.scale.setScalar(0.65 + age * 2.3);
        (particle.mesh.material as THREE.MeshBasicMaterial).opacity = Math.sin(age * Math.PI) * 0.24;
      }

      if (intensity < 0.04 || speed < 5) return;
      spawnBudget += dt * (10 + intensity * 30);
      const forward = new THREE.Vector3(Math.sin(heading), 0, Math.cos(heading));
      const right = new THREE.Vector3(forward.z, 0, -forward.x);
      while (spawnBudget >= 1) {
        spawnBudget -= 1;
        const particle = particles[cursor++ % particles.length];
        wheelSide *= -1;
        particle.life = particle.maxLife = 0.55 + Math.random() * 0.38;
        particle.mesh.visible = true;
        particle.mesh.position
          .copy(carPosition)
          .addScaledVector(forward, -1.35)
          .addScaledVector(right, wheelSide * 0.92);
        particle.mesh.position.y = 0.28;
        particle.mesh.scale.setScalar(0.65);
        particle.velocity
          .copy(forward)
          .multiplyScalar(-0.35 - Math.random() * 0.55)
          .addScaledVector(right, (Math.random() - 0.5) * 0.75);
      }
    },
  };
}

function createSkidMarks(scene: THREE.Scene) {
  const capacity = 260;
  const marks = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.16, 0.012, 0.72),
    new THREE.MeshBasicMaterial({ color: 0x171a18, transparent: true, opacity: 0.34, depthWrite: false }),
    capacity,
  );
  marks.count = 0;
  marks.renderOrder = 1;
  // Instance positions move around a ring buffer, so a cached bounding sphere would cull them incorrectly.
  marks.frustumCulled = false;
  scene.add(marks);

  const matrix = new THREE.Matrix4();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3(1, 1, 1);
  let cursor = 0;
  let distanceBudget = 0;

  return {
    update(carPosition: THREE.Vector3, heading: number, intensity: number, distance: number) {
      if (intensity < 0.16) {
        distanceBudget = 0;
        return;
      }
      distanceBudget += distance;
      const forward = new THREE.Vector3(Math.sin(heading), 0, Math.cos(heading));
      const right = new THREE.Vector3(forward.z, 0, -forward.x);
      quaternion.setFromAxisAngle(UP, heading);
      let changed = false;
      while (distanceBudget >= 0.52) {
        distanceBudget -= 0.52;
        for (const side of [-1, 1]) {
          const markPosition = carPosition
            .clone()
            .addScaledVector(forward, -1.28)
            .addScaledVector(right, side * 0.91);
          markPosition.y = 0.125;
          matrix.compose(markPosition, quaternion, scale);
          marks.setMatrixAt(cursor % capacity, matrix);
          cursor++;
          changed = true;
        }
      }
      marks.count = Math.min(cursor, capacity);
      if (changed) marks.instanceMatrix.needsUpdate = true;
    },
    reset() {
      distanceBudget = 0;
    },
  };
}

type CarAudioParameters = {
  dt: number;
  speed: number;
  signedSlipDegrees: number;
  steeringLoad: number;
  steerDirection: number;
  phase: DriftPhase;
  onPavement: boolean;
  boosting: boolean;
};

type CarAudio = {
  update: (parameters: CarAudioParameters) => void;
  impact: (strength: number) => void;
  setPaused: (paused: boolean) => void;
  destroy: () => void;
};

function createCarAudio(): CarAudio | null {
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
  let lastShiftTime = -1;
  let shiftDipUntil = 0;
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

  function triggerShift() {
    const now = context.currentTime;
    shiftDipUntil = now + 0.11;
    engineNode?.port.postMessage({ type: "shift" });
    triggerNoise(0.065, 0.075, 1250);
    triggerThump(82, 0.08, 0.14);
  }

  return {
    update({ dt, speed, signedSlipDegrees, steeringLoad, steerDirection, phase, onPavement, boosting }) {
      const now = context.currentTime;
      const speedNormalized = THREE.MathUtils.clamp(speed / DRIVING.maximumSpeed, 0, 1);
      const absoluteSlip = Math.abs(signedSlipDegrees);
      const slipRate = (signedSlipDegrees - previousSignedSlip) / Math.max(dt, 0.001);
      const slipGrowth = (absoluteSlip - previousAbsoluteSlip) / Math.max(dt, 0.001);
      const instability = THREE.MathUtils.clamp(Math.abs(slipRate) / 110, 0, 1);
      chirpCooldown = Math.max(0, chirpCooldown - dt);

      // Short lower gears create rhythm; a final overdrive prevents long straights from sitting at redline.
      const gearEdges = [0, 4.2, 8.2, 12.2, 16.3, 20.5, 24, 28];
      let desiredGear = gear;
      for (let i = 0; i < gearEdges.length - 1; i++) {
        if (speed >= gearEdges[i]) desiredGear = i;
      }
      if (desiredGear !== gear && now - lastShiftTime > 0.38) {
        gear = desiredGear;
        lastShiftTime = now;
        triggerShift();
      }
      const gearStart = gearEdges[gear];
      const gearEnd = gearEdges[Math.min(gear + 1, gearEdges.length - 1)];
      const gearProgress = THREE.MathUtils.clamp((speed - gearStart) / Math.max(gearEnd - gearStart, 1), 0, 1);
      const drivingRpm = 2200 + gearProgress * 5600;
      const acceleration = (speed - previousVehicleSpeed) / Math.max(dt, 0.001);
      previousVehicleSpeed = speed;
      const accelerationLoad = THREE.MathUtils.smoothstep(acceleration, 0.15, 7);
      const cruiseWander = (1 - accelerationLoad)
        * (Math.sin(now * 0.83) * 42 + Math.sin(now * 2.17) * 19);
      const targetRpm = THREE.MathUtils.lerp(900, drivingRpm, THREE.MathUtils.smoothstep(speed, 0.15, 2))
        + cruiseWander;
      const rpmResponse = targetRpm > engineRpm ? 0.06 : 0.095;
      engineRpm = THREE.MathUtils.lerp(engineRpm, targetRpm, 1 - Math.exp(-dt / rpmResponse));

      const drifting = phase === "breakaway" || phase === "sustain" || phase === "transition";
      let targetLoad = 0.34
        + speedNormalized * 0.08
        + accelerationLoad * 0.3
        + Number(drifting) * 0.22
        + enginePunch * 0.2;
      if (phase === "recover") targetLoad = 0.2;
      if (boosting) targetLoad += 0.22;
      if (now < shiftDipUntil) targetLoad = 0.08;
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
