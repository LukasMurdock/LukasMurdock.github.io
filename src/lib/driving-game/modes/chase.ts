import { createIdleModeController, type GameModeDefinition } from "./types";

/**
 * Lifecycle and presentation scaffold for the future pursuit mode.
 * Pursuers, capture rules, escalation, and chase HUD belong in this controller,
 * while maps and player handling remain shared with cruise mode.
 */
export const CHASE_MODE: GameModeDefinition = {
  id: "chase",
  available: false,
  copy: {
    eyebrow: "Car chase",
    title: "Lose them.",
    description: "Keep moving, use the city, and break pursuit before the chase closes in.",
    startLabel: "Start chase",
  },
  createController: createIdleModeController,
};
