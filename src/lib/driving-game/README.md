# Driving game architecture

The driving game is split along the things that can vary independently:

- `runtime.ts` — renderer and DOM lifecycle, cameras, mode wiring, drive timing, and the frame loop.
- `driving-profiles.ts` — internal handling presets used while tuning.
- `audio/` — car-audio orchestration plus procedural engine and tire AudioWorklet sources.
- `player/` — player input, handling state, collision response, feedback events, and the stable player API.
- `vehicle/` — player-car construction, drift smoke, and skid marks.
- `feedback/` — inexpensive screen-space gameplay feedback such as redline speed lines.
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
  drivingProfile: "loose",
});
```

The runtime defaults to the values above. The page does not currently expose selectors; these are composition seams for development and future navigation. The page may explicitly select another profile while tuning.

Available internal handling profiles are `balanced`, `loose`, `technical`, and `aggressive`. Aggressive raises acceleration and top speed, uses faster and deeper breakaway behavior, strengthens hard-drift entry and exit boost, and deliberately reaches redline at its normal maximum speed. The other profiles retain a quieter overdrive ratio.

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

Every registered mode receives the selected map and its built `WorldRuntime` service. The service owns pavement, obstacle, spawn, and boundary queries so player and future pursuit actors share one spatial truth.

## Local drive leaderboard

A drive timer advances only while gameplay is running and unpaused. Building collisions, world-boundary exits, manual resets, and mode-requested resets end the current drive and persist its duration in `localStorage`. Results include the selected mode, map, handling profile, end reason, and timestamp; the longest drives sort first and storage is capped at 100 entries.

A future command can import `getLocalDriveLeaderboard` from the public `driving-game.ts` facade. It supports mode, map, profile, and result-count filters. `clearLocalDriveLeaderboard` is also exported for a future reset command. Trees, barriers, and streetlights are terminal collision obstacles: hitting one resets the car and records the completed drive alongside building and boundary failures.

## Adding or implementing a mode

1. Add a `GameModeDefinition` under `modes/`.
2. Register it in `modes/index.ts`.
3. Implement its controller lifecycle: `start`, `update`, `pause`, `reset(reason)`, `onPlayerEvent`, and `destroy`.
4. Put mode-owned entities, pursuit state, win/loss rules, escalation, and mode HUD adapters in that controller—not in maps or player handling.

The cruise controller is intentionally idle. Chase owns a lightweight police pursuer, capture pressure, and its compact HUD. `/drive/` remains Cruise by default; use `/drive/?mode=chase` to launch the Chase composition directly.

A mode controller receives the world service, a refreshed player snapshot with detached position and velocity vectors, elapsed drive time, typed collision and drift-phase events, and a mode-owned `endDrive` action. Session resets arrive once through `reset(reason)`. It can add objects to the shared scene without reaching into or mutating player internals. It should not fork the shared vehicle model unless a mode genuinely requires different handling; use a driving profile for deliberate handling experiments.
