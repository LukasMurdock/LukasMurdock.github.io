import { CITY_CIRCUIT_MAP } from "./city-circuit";
import type { GameMapDefinition } from "./types";

export const GAME_MAPS = {
  "city-circuit": CITY_CIRCUIT_MAP,
} satisfies Record<string, GameMapDefinition>;

export type GameMapId = keyof typeof GAME_MAPS;
export type { GameMapDefinition } from "./types";
