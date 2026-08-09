# Driving game architecture

The driving game is split along the things that can vary independently:

- `runtime.ts` — rendering, player vehicle, controls, cameras, collisions, audio, and the frame loop.
- `driving-profiles.ts` — internal handling presets used while tuning.
- `audio/` — procedural engine and tire AudioWorklet sources.
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

## Adding or implementing a mode

1. Add a `GameModeDefinition` under `modes/`.
2. Register it in `modes/index.ts`.
3. Implement its controller lifecycle: `update`, `reset`, and `destroy`.
4. Put mode-owned entities, pursuit state, win/loss rules, escalation, and mode HUD adapters in that controller—not in maps or player handling.

The cruise controller is intentionally idle. The chase definition currently establishes its copy and lifecycle seam but is marked unavailable until pursuit behavior exists.

A mode controller can read a safe player snapshot, add objects to the shared scene, and request a player reset. It should not fork the shared vehicle model unless a mode genuinely requires different handling; use a driving profile for deliberate handling experiments.
