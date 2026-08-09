import { CITY_CIRCUIT_MAP } from "./city-circuit";
import { CROSSWIND_MAP } from "./crosswind";
import type { GameMapDefinition } from "./types";

export const GAME_MAPS = {
  "city-circuit": CITY_CIRCUIT_MAP,
  crosswind: CROSSWIND_MAP,
} satisfies Record<string, GameMapDefinition>;

export type GameMapId = keyof typeof GAME_MAPS;
export type { GameMapDefinition } from "./types";
