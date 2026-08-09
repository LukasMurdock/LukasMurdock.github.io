import type * as THREE from "three";
import type { DriftPhase } from "../types";
import type { GameMapDefinition } from "../maps";

export type ModePlayerSnapshot = {
  position: THREE.Vector3;
  heading: number;
  speed: number;
  driftPhase: DriftPhase;
};

export type GameModeContext = {
  scene: THREE.Scene;
  hudRoot: HTMLElement;
  map: GameMapDefinition;
  getPlayer: () => ModePlayerSnapshot;
  resetPlayer: () => void;
};

export type GameModeController = {
  update: (dt: number) => void;
  reset: () => void;
  destroy: () => void;
};

export type GameModeDefinition = {
  id: string;
  available: boolean;
  copy: {
    eyebrow: string;
    title: string;
    description: string;
    startLabel: string;
  };
  createController: (context: GameModeContext) => GameModeController;
};

export function createIdleModeController(): GameModeController {
  return {
    update() {},
    reset() {},
    destroy() {},
  };
}
