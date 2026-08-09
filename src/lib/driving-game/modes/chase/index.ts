import type { GameModeDefinition } from "../types";
import { createChaseController } from "./chase-controller";

export const CHASE_MODE: GameModeDefinition = {
  id: "chase",
  available: true,
  copy: {
    eyebrow: "Car chase",
    title: "Lose them.",
    description: "Keep moving, use the city, and stay ahead when the pursuit closes in.",
    startLabel: "Start chase",
  },
  createController: createChaseController,
};
