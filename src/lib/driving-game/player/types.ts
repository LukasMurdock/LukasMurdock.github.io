import type * as THREE from "three";
import type { DriftPhase } from "../types";
import type { ObstacleKind } from "../world/types";

export type PlayerControlName = "left" | "right" | "handbrake";

export type PlayerSnapshot = {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  heading: number;
  speed: number;
  visualSlip: number;
  driftPhase: DriftPhase;
  boosting: boolean;
  cameraShake: number;
  exitPulse: number;
};

export type PlayerEvent =
  | {
      type: "collision";
      obstacleType: ObstacleKind | "boundary";
      terminal: boolean;
      strength: number;
    }
  | { type: "drift-phase"; phase: DriftPhase };

export type PlayerController = {
  start: () => void;
  update: (dt: number) => void;
  setControl: (name: PlayerControlName, pressed: boolean) => void;
  clearControls: () => void;
  reset: () => void;
  setPaused: (paused: boolean) => void;
  getSnapshot: () => PlayerSnapshot;
  decayCameraShake: (dt: number) => void;
  destroy: () => void;
};
