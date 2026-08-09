# Driving game architecture

The driving game is split along the things that can vary independently:

- `runtime.ts` — renderer and DOM lifecycle, responsive display/input capabilities, cameras, mode wiring, drive timing, and the frame loop.
- `driving-profiles.ts` — internal handling presets used while tuning.
- `audio/` — car-audio orchestration plus procedural engine and tire AudioWorklet sources.
- `player/` — player input, handling state, collision response, feedback events, and the stable player API.
- `vehicle/` — player-car construction, drift smoke, and skid marks.
- `feedback/` — inexpensive screen-space gameplay feedback such as redline speed lines.
- `world/` — map construction, circuit geometry, buildings, props, visible perimeter fencing, and collision bounds.
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

The page exposes Cruise and Chase plus Circuit City, Crosswind, and Switchyard selection before play and while paused. Mode changes replace only the mode controller; map changes dispose and rebuild the world while retaining the renderer, controls, player presentation, and page lifecycle. The runtime derives touch capability and orientation from browser capabilities and container geometry rather than user-agent strings, and pauses safely when an active drive rotates. Automatic controls remain the default. On fine-pointer desktops, entering Up, Up, Down, Down, Left, Right, Left, Right before play or while paused unlocks the persisted Manual scheme and its hidden selector. Cruise defaults to the `loose` profile; Chase defaults to `aggressive`. Passing `drivingProfile` explicitly overrides the mode default for tuning.

Available internal handling profiles are `balanced`, `loose`, `technical`, and `aggressive`. Aggressive raises acceleration and top speed, uses faster and deeper breakaway behavior, strengthens hard-drift entry and exit boost, and deliberately reaches redline at its normal maximum speed. The other profiles retain a quieter overdrive ratio. The audio-only transmission uses five logical forward stages but fully punctuates only three upshifts: the launch transition is absorbed, active drifts hold their gear, recovery briefly inhibits shifts, and braking or multi-stage changes reconcile without an upshift thump. A 320 ms re-arm, 6% downshift hysteresis, dedicated worklet torque-cut envelope, and mostly longitudinal speed reference prevent threshold chatter. Player resets and reverse engagement return it silently to the launch stage.

## Adding a map

1. Add a `GameMapDefinition` under `maps/` with concise selector-ready title and description copy.
2. Register it in `maps/index.ts`; the intro and pause selectors are generated from `GAME_MAPS`.
3. Choose either a circuit-based spawn or an explicit position and heading.
4. Use optional road rotation for diagonal pavement; `"taxiway"` markings support faded rotated edge dashes.
5. Keep mode-specific entities and rules out of the map definition.

`DEFAULT_GAME_MAP_ID` owns the no-query default, while `isGameMapId()` validates direct `?map=` launches against the registry. Adding a nondefault map does not require another URL-parsing branch.

Switchyard uses one broad freight apron and two staggered rows of short sheds. Its three longitudinal channels create delayed lane-transfer and double-transfer decisions without map-specific pursuit behavior. Subtle pavement bands, inspection pads, and the visual-only `freight` building style establish lane and yard identity while preserving shared pavement and axis-aligned collision semantics.

A map owns:

- world and ground dimensions;
- environment colors, fog, camera range, and shadow coverage;
- roads and parking lots used by pavement detection;
- buildings, trees, and barriers;
- optional semantic circuit grammar;
- player spawn.

Every map receives a lightweight visual fence at `worldLimit`. The car's paired-circle footprint reaches that fence as its center enters the existing boundary-reset zone, so the visible perimeter and terminal boundary remain spatially consistent without adding fence obstacles.

Every registered mode receives the selected map and its built `WorldRuntime` service. The service owns pavement, obstacle, spawn, and boundary queries so player and pursuit actors share one spatial truth. Its `destroy()` method removes and disposes all map-owned scene resources during an in-place map change.

## Local drive leaderboard

A drive timer advances only while gameplay is running and unpaused. Building collisions, world-boundary exits, manual resets, and mode-requested resets end the current drive and persist its duration in `localStorage`. Results include the selected mode, map, handling profile, control scheme, end reason, and timestamp; old records migrate as Automatic, Automatic and Manual leaderboards remain separate, the longest drives sort first, and storage is capped at 100 entries.

A future command can import `getLocalDriveLeaderboard` from the public `driving-game.ts` facade. It supports mode, map, profile, and result-count filters. `clearLocalDriveLeaderboard` is also exported for a future reset command. Trees, barriers, and streetlights are terminal collision obstacles: hitting one resets the car and records the completed drive alongside building and boundary failures.

## Adding or implementing a mode

1. Add a `GameModeDefinition` under `modes/`.
2. Register it in `modes/index.ts`.
3. Implement its controller lifecycle: `start`, `update`, `isDriveClockRunning`, `pause`, `reset(reason)`, `onPlayerEvent`, and `destroy`.
4. Put mode-owned entities, pursuit state, win/loss rules, escalation, and mode HUD adapters in that controller—not in maps or player handling.

The cruise controller is intentionally idle. Chase is a longest-survival mode with up to three escalating police pursuers, physical-collision capture, a brief post-capture state, pursuit pressure, and a compact survival timer. From 30–45 seconds, pursuit accuracy ramps modestly through faster target observation, slightly stronger prediction, and a small turn-rate increase without adding speed or removing close-range steering limits. Rear placement now tries a broader generic candidate fan and delays activation when no safe position exists; pursuers that remain slow or repeatedly collide while away from the player can reposition behind them with brief capture grace. `/drive/` remains Cruise by default; use `/drive/?mode=chase` to launch the Chase composition directly.

A mode controller receives the world service, a refreshed player snapshot with detached position and velocity vectors, elapsed drive time, typed collision and drift-phase events, and a mode-owned `endDrive` action. Its `isDriveClockRunning()` hook excludes non-playing states such as Chase's capture presentation from the recorded survival time. Session resets arrive once through `reset(reason)`. It can add objects to the shared scene without reaching into or mutating player internals. It should not fork the shared vehicle model unless a mode genuinely requires different handling; use a driving profile for deliberate handling experiments.
