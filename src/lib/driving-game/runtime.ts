import * as THREE from "three";
import { createCarAudio, type CarAudio } from "./audio/car-audio";
import { DRIVING_PROFILES } from "./driving-profiles";
import { addLocalDriveResult, type DriveEndReason } from "./local-leaderboard";
import { GAME_MAPS } from "./maps";
import { GAME_MODES } from "./modes";
import type { CameraMode, DriftPhase, DrivingGameOptions } from "./types";
import { createCar } from "./vehicle/create-car";
import { createDriftSmoke, createSkidMarks } from "./vehicle/effects";
import { buildWorld, type Obstacle } from "./world/build-world";

type ControlName = "left" | "right" | "handbrake";

const UP = new THREE.Vector3(0, 1, 0);
const CAR_RADIUS = 1.25;

export function startDrivingGame(root: HTMLElement, options: DrivingGameOptions = {}) {
  const map = GAME_MAPS[options.map ?? "city-circuit"];
  const mode = GAME_MODES[options.mode ?? "cruise"];
  const drivingProfileId = options.drivingProfile ?? "balanced";
  const DRIVING = DRIVING_PROFILES[drivingProfileId];
  const canvas = root.querySelector<HTMLCanvasElement>("#game-canvas");
  const cameraNode = root.querySelector<HTMLElement>("#camera-mode");
  const modeHud = root.querySelector<HTMLElement>("#mode-hud");
  const intro = root.querySelector<HTMLElement>("#intro");
  const startButton = root.querySelector<HTMLButtonElement>("#start-driving");
  const pauseOverlay = root.querySelector<HTMLElement>("#pause-overlay");
  const pauseButton = root.querySelector<HTMLButtonElement>("#pause-button");
  const resumeButton = root.querySelector<HTMLButtonElement>("#resume-driving");
  if (!canvas || !cameraNode || !modeHud || !intro || !startButton || !pauseOverlay || !pauseButton || !resumeButton) return;
  const cameraDisplay = cameraNode;
  const gameCanvas = canvas;
  const pauseLayer = pauseOverlay;
  const pauseControl = pauseButton;
  const resumeControl = resumeButton;

  const introEyebrow = intro.querySelector<HTMLElement>(".eyebrow");
  const introTitle = intro.querySelector<HTMLElement>("h1");
  const introDescription = intro.querySelector<HTMLElement>(".intro-card > p:not(.eyebrow)");
  if (introEyebrow) introEyebrow.textContent = mode.copy.eyebrow;
  if (introTitle) introTitle.textContent = mode.copy.title;
  if (introDescription) introDescription.textContent = mode.copy.description;
  if (startButton.firstChild) startButton.firstChild.textContent = `${mode.copy.startLabel} `;
  root.dataset.gameMode = mode.id;
  root.dataset.gameMap = map.id;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(map.environment.background);
  scene.fog = new THREE.Fog(map.environment.background, map.environment.fogNear, map.environment.fogFar);

  const perspectiveCamera = new THREE.PerspectiveCamera(60, 1, 0.1, map.environment.cameraFar);
  const isometricCamera = new THREE.OrthographicCamera(-20, 20, 20, -20, 0.1, map.environment.cameraFar);
  const sideCamera = new THREE.OrthographicCamera(-17, 17, 12, -12, 0.1, map.environment.sideCameraFar);
  let cameraMode: CameraMode = "Chase";
  const cameraModes: CameraMode[] = ["Chase", "Isometric", "Side"];

  scene.add(new THREE.HemisphereLight(0xeaf6ef, 0x5d632a, 1.65));
  const sun = new THREE.DirectionalLight(0xffe6ad, 3.35);
  sun.position.set(-52, 64, -38);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -map.environment.shadowExtent;
  sun.shadow.camera.right = map.environment.shadowExtent;
  sun.shadow.camera.top = map.environment.shadowExtent;
  sun.shadow.camera.bottom = -map.environment.shadowExtent;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = map.environment.shadowFar;
  scene.add(sun);

  const obstacles: Obstacle[] = [];
  const world = buildWorld(scene, obstacles, map);
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
  let hardDriftInputBuffer = 0;
  let hardDriftKick = 0;
  let hardDriftEntry = false;
  let lastSteerTapTime = Number.NEGATIVE_INFINITY;
  let lastSteerTapDirection = 0;
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
  let modeController: ReturnType<typeof mode.createController> | null = null;
  let carAudio: CarAudio | null = null;
  let driveTime = 0;
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

  function setControl(name: ControlName, pressed: boolean) {
    if ((name === "left" || name === "right") && pressed && !controls[name]) {
      const tapTime = performance.now() / 1000;
      const tapDirection = name === "left" ? 1 : -1;
      if (
        tapTime - lastSteerTapTime <= DRIVING.hardDrift.doubleTapWindow
        && tapDirection === lastSteerTapDirection
      ) {
        hardDriftInputBuffer = DRIVING.hardDrift.inputBuffer;
      }
      lastSteerTapTime = tapTime;
      lastSteerTapDirection = tapDirection;
    }
    controls[name] = pressed;
  }

  function clearControls() {
    for (const key of Object.keys(controls) as ControlName[]) controls[key] = false;
    lastSteerTapTime = Number.NEGATIVE_INFINITY;
    lastSteerTapDirection = 0;
    hardDriftInputBuffer = 0;
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

  function resetCar(reason: DriveEndReason = "manual") {
    if (running && driveTime > 0) {
      addLocalDriveResult({
        durationSeconds: driveTime,
        reason,
        mode: mode.id,
        map: map.id,
        drivingProfile: drivingProfileId,
      });
    }
    driveTime = 0;
    position.copy(world.spawnPosition);
    velocity.set(0, 0, 0);
    heading = world.spawnHeading;
    driftPhase = "grip";
    driftDirection = 0;
    driftTime = 0;
    phaseTime = 0;
    yawVelocity = 0;
    driftInputBuffer = 0;
    hardDriftInputBuffer = 0;
    hardDriftKick = 0;
    hardDriftEntry = false;
    lastSteerTapTime = Number.NEGATIVE_INFINITY;
    lastSteerTapDirection = 0;
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
    modeController?.reset();
    car.group.position.copy(position);
    car.group.rotation.set(0, heading, 0);
  }

  modeController = mode.createController({
    scene,
    hudRoot: modeHud,
    map,
    getPlayer: () => ({
      position: position.clone(),
      heading,
      speed: velocity.length(),
      driftPhase,
    }),
    resetPlayer: () => resetCar("mode"),
  });

  function switchCamera() {
    const index = (cameraModes.indexOf(cameraMode) + 1) % cameraModes.length;
    cameraMode = cameraModes[index];
    cameraDisplay.textContent = cameraMode;
  }

  function onKey(event: KeyboardEvent, pressed: boolean) {
    const control = keyMap[event.code];
    if (control) {
      setControl(control, pressed);
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
      setControl(name, pressed);
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
  root.querySelector("#reset-button")?.addEventListener("click", () => resetCar("manual"));
  pauseButton.addEventListener("click", () => setPaused(true));
  resumeButton.addEventListener("click", () => setPaused(false));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && running && !paused) setPaused(true);
  });
  startButton.addEventListener("click", () => {
    running = true;
    paused = false;
    carAudio ??= createCarAudio(DRIVING);
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
    hardDriftInputBuffer = Math.max(0, hardDriftInputBuffer - dt);
    previousHandbrake = controls.handbrake;

    const hardDirection = Math.sign(steer);
    const canHardDrift = speed > DRIVING.hardDrift.minimumSpeed
      && Math.abs(steer) > 0.16
      && (driftPhase === "grip" || driftPhase === "recover" || hardDirection === driftDirection);
    if (hardDriftInputBuffer > 0 && canHardDrift) {
      hardDriftInputBuffer = 0;
      hardDriftKick = 1;
      if (driftPhase === "grip" || driftPhase === "recover") {
        driftPhase = "breakaway";
        driftDirection = hardDirection;
        driftTime = 0;
        phaseTime = 0;
        transitionIntentTime = 0;
        driftEntrySpeed = speed;
        driftStayedOnPavement = onPavement;
      }
      hardDriftEntry = driftPhase === "breakaway";
      velocity.multiplyScalar(DRIVING.hardDrift.initialSpeedRetention);
      bodyKick = 1.25;
      cameraShake = Math.max(cameraShake, 0.11);
      driftInputBuffer = 0;
    }

    const canBreakAway = speed > DRIVING.drift.minimumSpeed && Math.abs(steer) > 0.16;
    if (driftPhase === "grip" && canBreakAway && (controls.handbrake || driftInputBuffer > 0)) {
      driftPhase = "breakaway";
      driftDirection = Math.sign(steer);
      driftTime = 0;
      phaseTime = 0;
      transitionIntentTime = 0;
      driftEntrySpeed = speed;
      driftStayedOnPavement = onPavement;
      hardDriftEntry = false;
      bodyKick = 1;
      cameraShake = Math.max(cameraShake, 0.075);
      driftInputBuffer = 0;
    }

    // Releasing Drift always means hook-up. This keeps the mechanic predictable.
    if (!hardDriftEntry && driftPhase !== "grip" && driftPhase !== "recover" && !controls.handbrake) {
      driftPhase = "recover";
      hardDriftEntry = false;
      phaseTime = 0;
      transitionIntentTime = 0;
    }

    if (!hardDriftEntry) {
      hardDriftKick = Math.max(0, hardDriftKick - dt / DRIVING.hardDrift.kickDecay);
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
        const hardAmount = hardDriftEntry ? 1 : hardDriftKick;
        const entryDuration = THREE.MathUtils.lerp(
          DRIVING.drift.breakawayDuration,
          DRIVING.hardDrift.entryDuration,
          hardAmount,
        );
        const setProgress = THREE.MathUtils.clamp(phaseTime / entryDuration, 0, 1);
        const normalDegrees = THREE.MathUtils.lerp(
          DRIVING.drift.breakawayStartAngle,
          DRIVING.drift.breakawayEndAngle,
          setProgress,
        );
        const hardDegrees = THREE.MathUtils.lerp(
          DRIVING.hardDrift.startAngle,
          DRIVING.hardDrift.endAngle,
          setProgress,
        );
        const steeringAngle = THREE.MathUtils.lerp(
          DRIVING.drift.breakawaySteeringAngle,
          DRIVING.hardDrift.steeringAngle,
          hardAmount,
        );
        const targetDegrees = THREE.MathUtils.lerp(normalDegrees, hardDegrees, hardAmount)
          + Math.max(0, steer * driftDirection) * steeringAngle;
        targetSlip = THREE.MathUtils.degToRad(-driftDirection * targetDegrees);
        const entryImpulse = THREE.MathUtils.lerp(
          DRIVING.drift.breakawayImpulse,
          DRIVING.hardDrift.entryImpulse,
          hardAmount,
        );
        setImpulse = driftDirection * entryImpulse * (1 - setProgress) * speedRatio;
        if (phaseTime >= entryDuration) {
          driftPhase = "sustain";
          hardDriftEntry = false;
          phaseTime = 0;
        }
      } else if (driftPhase === "sustain") {
        const intoDrift = steer * driftDirection;
        const holdCharge = THREE.MathUtils.clamp(
          (driftTime - DRIVING.drift.sustainChargeDelay) / DRIVING.drift.sustainChargeDuration,
          0,
          1,
        ) * DRIVING.drift.sustainChargeAngle;
        const hardAngleKick = hardDriftKick
          * (DRIVING.hardDrift.endAngle - DRIVING.drift.sustainBaseAngle);
        const targetDegrees = THREE.MathUtils.clamp(
          DRIVING.drift.sustainBaseAngle
            + holdCharge
            + hardAngleKick
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
      const hardCorneringMultiplier = THREE.MathUtils.lerp(
        1,
        DRIVING.hardDrift.corneringMultiplier,
        hardDriftKick,
      );
      const baseDriftGrip = THREE.MathUtils.lerp(
        DRIVING.drift.lateralGrip,
        DRIVING.hardDrift.lateralGrip,
        hardDriftKick,
      );
      grip = driftPhase === "transition"
        ? DRIVING.drift.transitionGrip
        : baseDriftGrip
          + corneringDemand * DRIVING.drift.corneringGrip * hardCorneringMultiplier;

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
        + dangerPenalty * dangerPenalty * DRIVING.drift.dangerPenalty
        + hardDriftKick * DRIVING.hardDrift.entryDrag;
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
      material.emissiveIntensity = controls.handbrake || hardDriftKick > 0.05 ? 5 : 1.2;
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
        resetCar("collision");
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

    const limit = map.worldLimit - CAR_RADIUS;
    if (Math.abs(position.x) > limit || Math.abs(position.z) > limit) {
      carAudio?.impact(Math.min(1, velocity.length() / 18));
      resetCar("boundary");
    }
  }

  const lookTarget = position.clone();
  const isometricFocus = position.clone();
  const isometricOffset = new THREE.Vector3(26, 48, 26);
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
    } else if (cameraMode === "Isometric") {
      // Keep a stable world-space projection so buildings read as a diorama and steering never rotates the board.
      isometricFocus.lerp(position, follow);
      isometricCamera.position.copy(isometricFocus).add(isometricOffset);
      isometricCamera.up.copy(UP);
      isometricCamera.lookAt(isometricFocus);
    } else {
      const targetPosition = position.clone().add(new THREE.Vector3(30, 15, 0));
      sideCamera.position.lerp(targetPosition, follow);
      sideCamera.up.copy(UP);
      sideCamera.lookAt(lookTarget);
    }
    cameraShake *= Math.exp(-9 * dt);
  }

  function activeCamera(): THREE.Camera {
    if (cameraMode === "Isometric") return isometricCamera;
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
    const isometricSize = 20;
    isometricCamera.left = -isometricSize * aspect;
    isometricCamera.right = isometricSize * aspect;
    isometricCamera.top = isometricSize;
    isometricCamera.bottom = -isometricSize;
    isometricCamera.updateProjectionMatrix();

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
    const wallElapsed = Math.min((now - lastTime) / 1000, 1);
    const elapsed = Math.min(wallElapsed, 0.05);
    lastTime = now;
    if (running && !paused) {
      driveTime += wallElapsed;
      updateCar(elapsed);
      modeController?.update(elapsed);
    }
    updateCamera(elapsed);
    renderer.render(scene, activeCamera());
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  document.addEventListener("astro:before-swap", () => {
    destroyed = true;
    resizeObserver.disconnect();
    carAudio?.destroy();
    modeController?.destroy();
    renderer.dispose();
  }, { once: true });
}

function normalizeAngle(angle: number) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

function angleDifference(from: number, to: number) {
  return normalizeAngle(to - from);
}
