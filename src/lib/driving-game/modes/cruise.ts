import { createIdleModeController, type GameModeDefinition } from "./types";

export const CRUISE_MODE: GameModeDefinition = {
  id: "cruise",
  available: true,
  copy: {
    eyebrow: "A tiny driving playground",
    title: "Take a drive.",
    description: "Follow the red-and-white circuit, link its corners, or leave the course and roam the city. There is nowhere you need to be.",
    startLabel: "Start driving",
  },
  createController: createIdleModeController,
};
