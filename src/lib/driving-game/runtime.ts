import * as THREE from "three";
import { DRIVING_PROFILES } from "./driving-profiles";
import { createSpeedLines } from "./feedback/speed-lines";
import { addLocalDriveResult } from "./local-leaderboard";
import { GAME_MAPS } from "./maps";
import { GAME_MODES } from "./modes";
import type { CameraMode, DriveEndReason, DrivingGameOptions } from "./types";
import { createPlayerController, type PlayerControlName } from "./player";
import { buildWorld } from "./world/build-world";


const UP = new THREE.Vector3(0, 1, 0);

export function startDrivingGame(root: HTMLElement, options: DrivingGameOptions = {}) {
  const map = GAME_MAPS[options.map ?? "city-circuit"];
  const mode = GAME_MODES[options.mode ?? "cruise"];
  const drivingProfileId = options.drivingProfile ?? "loose";
  const DRIVING = DRIVING_PROFILES[drivingProfileId];
  const canvas = root.querySelector<HTMLCanvasElement>("#game-canvas");
  const speedLinesCanvas = root.querySelector<HTMLCanvasElement>("#speed-lines-canvas");
  const cameraNode = root.querySelector<HTMLElement>("#camera-mode");
  const modeHud = root.querySelector<HTMLElement>("#mode-hud");
  const intro = root.querySelector<HTMLElement>("#intro");
  const startButton = root.querySelector<HTMLButtonElement>("#start-driving");
  const pauseOverlay = root.querySelector<HTMLElement>("#pause-overlay");
  const pauseButton = root.querySelector<HTMLButtonElement>("#pause-button");
  const resumeButton = root.querySelector<HTMLButtonElement>("#resume-driving");
  if (
    !canvas
    || !speedLinesCanvas
    || !cameraNode
    || !modeHud
    || !intro
    || !startButton
    || !pauseOverlay
    || !pauseButton
    || !resumeButton
  ) return;
  const cameraDisplay = cameraNode;
  const gameCanvas = canvas;
  const pauseLayer = pauseOverlay;
  const pauseControl = pauseButton;
  const resumeControl = resumeButton;
  const lifecycle = new AbortController();
  const listenerOptions = { signal: lifecycle.signal };

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

  const world = buildWorld(scene, map);
  const speedLines = createSpeedLines(speedLinesCanvas);
  let modeController: ReturnType<typeof mode.createController> | null = null;
  let driveTime = 0;
  let running = false;
  let paused = false;
  let destroyed = false;

  function endDrive(reason: DriveEndReason = "manual") {
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
    player.reset();
    modeController?.reset(reason);
  }

  const player = createPlayerController({
    scene,
    world,
    profile: DRIVING,
    onEvent: (event) => modeController?.onPlayerEvent(event),
    onResetRequested: endDrive,
  });

  const keyMap: Record<string, PlayerControlName | undefined> = {
    ArrowLeft: "left",
    KeyA: "left",
    ArrowRight: "right",
    KeyD: "right",
    Space: "handbrake",
  };

  function clearControls() {
    player.clearControls();
    root.querySelectorAll("[data-control]").forEach((node) => node.classList.remove("is-active"));
  }

  function setPaused(nextPaused: boolean) {
    if (!running) return;
    paused = nextPaused;
    clearControls();
    player.setPaused(paused);
    modeController?.pause(paused);
    pauseLayer.classList.toggle("is-visible", paused);
    pauseLayer.setAttribute("aria-hidden", String(!paused));
    pauseControl.setAttribute("aria-pressed", String(paused));
    if (paused) resumeControl.focus();
    else gameCanvas.focus();
  }

  modeController = mode.createController({
    scene,
    hudRoot: modeHud,
    map,
    world,
    getPlayer: player.getSnapshot,
    getDriveTime: () => driveTime,
    endDrive: () => endDrive("mode"),
  });

  function switchCamera() {
    const index = (cameraModes.indexOf(cameraMode) + 1) % cameraModes.length;
    cameraMode = cameraModes[index];
    cameraDisplay.textContent = cameraMode;
  }

  function onKey(event: KeyboardEvent, pressed: boolean) {
    const control = keyMap[event.code];
    if (control) {
      player.setControl(control, pressed);
      event.preventDefault();
    }
    if (!pressed && event.code === "KeyC") switchCamera();
    if (!pressed && event.code === "KeyR") endDrive("manual");
    if (!pressed && (event.code === "KeyP" || event.code === "Escape")) {
      event.preventDefault();
      setPaused(!paused);
    }
  }

  window.addEventListener("keydown", (event) => onKey(event, true), listenerOptions);
  window.addEventListener("keyup", (event) => onKey(event, false), listenerOptions);
  window.addEventListener("blur", clearControls, listenerOptions);

  root.querySelectorAll<HTMLElement>("[data-control]").forEach((button) => {
    const name = button.dataset.control as PlayerControlName;
    const setPressed = (pressed: boolean, event: Event) => {
      event.preventDefault();
      player.setControl(name, pressed);
      button.classList.toggle("is-active", pressed);
    };
    button.addEventListener("pointerdown", (event) => {
      button.setPointerCapture(event.pointerId);
      setPressed(true, event);
    }, listenerOptions);
    button.addEventListener("pointerup", (event) => setPressed(false, event), listenerOptions);
    button.addEventListener("pointercancel", (event) => setPressed(false, event), listenerOptions);
  });

  root.querySelector("#camera-button")?.addEventListener("click", switchCamera, listenerOptions);
  root.querySelector("#reset-button")?.addEventListener("click", () => endDrive("manual"), listenerOptions);
  pauseButton.addEventListener("click", () => setPaused(true), listenerOptions);
  resumeButton.addEventListener("click", () => setPaused(false), listenerOptions);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && running && !paused) setPaused(true);
  }, listenerOptions);
  startButton.addEventListener("click", () => {
    running = true;
    paused = false;
    player.start();
    player.setPaused(false);
    modeController?.start();
    intro.classList.add("is-hidden");
    canvas.focus();
  }, listenerOptions);

  const initialPlayerState = player.getSnapshot();
  const lookTarget = initialPlayerState.position.clone();
  const isometricFocus = initialPlayerState.position.clone();
  const isometricOffset = new THREE.Vector3(26, 48, 26);
  const cameraPosition = new THREE.Vector3();
  function updateCamera(dt: number) {
    const playerState = player.getSnapshot();
    const { position, velocity, heading, visualSlip, exitPulse, cameraShake } = playerState;
    const follow = 1 - Math.exp(-6 * dt);
    const forward = new THREE.Vector3(Math.sin(heading), 0, Math.cos(heading));
    const speed = playerState.speed;
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
    player.decayCameraShake(dt);
  }

  function activeCamera(): THREE.Camera {
    if (cameraMode === "Isometric") return isometricCamera;
    if (cameraMode === "Side") return sideCamera;
    return perspectiveCamera;
  }

  const speedLineFocus = new THREE.Vector3();
  function updateSpeedLines(dt: number) {
    const playerState = player.getSnapshot();
    const camera = activeCamera();
    camera.updateMatrixWorld();
    speedLineFocus.set(playerState.position.x, 0.8, playerState.position.z).project(camera);
    const focusVisible = speedLineFocus.z >= -1 && speedLineFocus.z <= 1;
    const redlineIntensity = running && !paused && focusVisible && DRIVING.redlineAtMaximumSpeed
      ? THREE.MathUtils.smoothstep(
          playerState.speed,
          DRIVING.maximumSpeed * 0.94,
          DRIVING.maximumSpeed,
        )
      : 0;
    speedLines.update({
      dt,
      enabled: cameraMode === "Chase",
      intensity: redlineIntensity,
      focusX: (speedLineFocus.x * 0.5 + 0.5) * root.clientWidth,
      focusY: (-speedLineFocus.y * 0.5 + 0.5) * root.clientHeight,
      boosting: playerState.boosting,
    });
  }

  function resize() {
    const width = root.clientWidth;
    const height = root.clientHeight;
    renderer.setSize(width, height, false);
    speedLines.resize(width, height);
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
  player.reset();
  modeController.reset("manual");
  updateCamera(1);

  let lastTime = performance.now();
  function frame(now: number) {
    if (destroyed) return;
    const wallElapsed = Math.min((now - lastTime) / 1000, 1);
    const elapsed = Math.min(wallElapsed, 0.05);
    lastTime = now;
    if (running && !paused) {
      driveTime += wallElapsed;
      player.update(elapsed);
      modeController?.update(elapsed);
    }
    updateCamera(elapsed);
    updateSpeedLines(wallElapsed);
    renderer.render(scene, activeCamera());
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  document.addEventListener("astro:before-swap", () => {
    destroyed = true;
    lifecycle.abort();
    resizeObserver.disconnect();
    player.destroy();
    modeController?.destroy();
    speedLines.destroy();
    renderer.dispose();
  }, { once: true, signal: lifecycle.signal });
}
