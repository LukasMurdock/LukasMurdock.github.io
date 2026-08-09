import type * as THREE from "three";
import type { GameMapDefinition } from "../maps";
import type { PlayerEvent, PlayerSnapshot } from "../player";
import type { DriveEndReason } from "../types";
import type { WorldRuntime } from "../world/types";

export type GameModeContext = {
  scene: THREE.Scene;
  hudRoot: HTMLElement;
  map: GameMapDefinition;
  world: WorldRuntime;
  getPlayer: () => PlayerSnapshot;
  getDriveTime: () => number;
  endDrive: () => void;
};

export type GameModeController = {
  start: () => void;
  update: (dt: number) => void;
  pause: (paused: boolean) => void;
  reset: (reason: DriveEndReason) => void;
  onPlayerEvent: (event: PlayerEvent) => void;
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
    start() {},
    update() {},
    pause() {},
    reset() {},
    onPlayerEvent() {},
    destroy() {},
  };
}
