# Driving game architecture

The driving game is split along the things that can vary independently:

- `runtime.ts` — lifecycle, shared state, controls, player physics, cameras, collisions, mode wiring, and the frame loop.
- `driving-profiles.ts` — internal handling presets used while tuning.
- `audio/` — car-audio orchestration plus procedural engine and tire AudioWorklet sources.
- `vehicle/` — player-car construction, drift smoke, and skid marks.
- `world/` — map construction, circuit geometry, buildings, props, and collision bounds.
- `local-leaderboard.ts` — persistent local drive results and future command-facing queries.
- `maps/` — world geometry, environment settings, pavement, spawn, and boundaries.
- `modes/` — rules, mode-specific actors, lifecycle, and presentation copy.
- `types.ts` — launch options and shared runtime state names.
- `design.md` — experiential north star.

`../driving-game.ts` is the stable public entry point used by the Astro page.

## Launching a combination

```ts
startDrivingGame(root, {
  mode: "cruise",
  map: "city-circuit",
  drivingProfile: "balanced",
});
```

All options default to the values above. The page does not currently expose selectors; these are composition seams for development and future navigation.

## Adding a map

1. Add a `GameMapDefinition` under `maps/`.
2. Register it in `maps/index.ts`.
3. Choose either a circuit-based spawn or an explicit position and heading.
4. Keep mode-specific entities and rules out of the map definition.

A map owns:

- world and ground dimensions;
- environment colors, fog, camera range, and shadow coverage;
- roads and parking lots used by pavement detection;
- buildings, trees, and barriers;
- optional semantic circuit grammar;
- player spawn.

Every registered mode receives the selected map in its runtime context.

## Local drive leaderboard

A drive timer advances only while gameplay is running and unpaused. Building collisions, world-boundary exits, manual resets, and mode-requested resets end the current drive and persist its duration in `localStorage`. Results include the selected mode, map, handling profile, end reason, and timestamp; the longest drives sort first and storage is capped at 100 entries.

A future command can import `getLocalDriveLeaderboard` from the public `driving-game.ts` facade. It supports mode, map, profile, and result-count filters. `clearLocalDriveLeaderboard` is also exported for a future reset command. Trees, barriers, and streetlights are terminal collision obstacles: hitting one resets the car and records the completed drive alongside building and boundary failures.

## Adding or implementing a mode

1. Add a `GameModeDefinition` under `modes/`.
2. Register it in `modes/index.ts`.
3. Implement its controller lifecycle: `update`, `reset`, and `destroy`.
4. Put mode-owned entities, pursuit state, win/loss rules, escalation, and mode HUD adapters in that controller—not in maps or player handling.

The cruise controller is intentionally idle. The chase definition currently establishes its copy and lifecycle seam but is marked unavailable until pursuit behavior exists.

A mode controller can read a safe player snapshot, add objects to the shared scene, and request a player reset. It should not fork the shared vehicle model unless a mode genuinely requires different handling; use a driving profile for deliberate handling experiments.
