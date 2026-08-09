# Multiplayer architecture proposal

Status: research and design only. This document does not make multiplayer part of the public game.

Research date: August 9, 2026. Two Codex CLI research passes reviewed the current repository, current Cloudflare Durable Objects documentation, PartyKit's legacy documentation, and the current Cloudflare PartyKit repository. The raw reports are available locally at `/tmp/durable-objects-multiplayer-research.md` and `/tmp/partykit-multiplayer-research.md`.

## Decision

Use one Cloudflare Durable Object per room, with a thin adapter around Cloudflare's current `partyserver` and `partysocket` packages.

Do not build on the legacy managed PartyKit runtime as the production foundation. The original PartyKit repository points current development to [`cloudflare/partykit`](https://github.com/cloudflare/partykit), where PartyServer runs directly on Durable Objects. PartyServer remains pre-1.0, so only the room adapter may depend on it. Simulation, protocol, prediction, room rules, and persistence remain framework-independent. Raw Durable Object WebSocket handlers remain the fallback without a game rewrite.

PartyServer does not make the network path faster than raw Durable Objects. It makes the first implementation faster by handling room routing, connections, broadcasts, and hibernation integration. Runtime latency is determined by the Durable Object's location and the protocol.

The player who creates a room is a lobby administrator, not the simulation host. The Durable Object is always authoritative. If the creator leaves, administration can transfer without any physics host migration.

## Product shape

The initial private release should support:

- two to four players, with eight as a later measured target;
- an eight-character human-friendly room code displayed as `ABCD-EFGH`;
- one locked map, profile, and control policy per match;
- creator/admin controls for settings, start, removal, and room closure;
- server-authoritative movement and collisions;
- immediate local prediction;
- interpolated remote cars;
- player-scoped resets;
- short reconnect grace and spawn protection;
- no mutable or resettable world state.

A room code is a locator, not authentication. A join request exchanges the code for a short-lived room- and player-bound capability. A reconnect secret stays in `sessionStorage` or a secure same-origin cookie rather than in the invite URL.

## Authority and reset semantics

The Durable Object owns:

- fixed simulation tick and match clock;
- map, handling profile, phase, and room capacity;
- every player's physical state and current controls;
- static-world and vehicle collision decisions;
- spawn selection, reset serials, and scores;
- lobby membership and role assignment.

Clients send input intent only. They never submit trusted position, velocity, collision, spawn, reset, score, or match state.

The existing `endDrive()` operation is session-wide and must not be reused for PvP contact. Multiplayer adds an explicit server operation:

```ts
resetPlayer(playerId, reason, authoritativeSpawn)
```

A static obstacle or boundary resets only that player. Mild car contact separates and applies a bounded impulse. A severe contact produces one or more targeted reset events based on deterministic impact rules. If both cars independently qualify, both receive player-scoped resets; the map, room clock, props, and uninvolved players continue unchanged.

Every reset contains a monotonic `resetSerial` and stable collision ID so duplicate network delivery cannot reset a player twice. A reset grants roughly 750–1,000 ms of server-owned spawn protection and temporary vehicle ghosting to prevent chain collisions.

## Simulation extraction is the prerequisite

Networking should not begin by sending the current `PlayerSnapshot`. `player-controller.ts` mixes physics with Three.js, render-frame timing, audio, smoke, skid marks, camera feedback, and browser input timing. It cannot run authoritatively in a Worker.

Extract a presentation-free simulation first:

```text
src/lib/driving-game/
├── simulation/
│   ├── types.ts                 Plain numeric state and input
│   ├── math.ts                  Vec2 and angle helpers
│   ├── step-vehicle.ts          Fixed-step arcade vehicle update
│   ├── collision-world.ts       Static collision against a manifest
│   ├── collision-vehicle.ts     Paired-circle narrow phase
│   ├── reset-player.ts          Player-scoped reset rules
│   └── match-engine.ts          Roster, ticks, pairs, events, snapshots
├── maps/
│   ├── collision-manifest.ts    Compact server-safe map geometry
│   └── manifest-hash.ts         Client/server map compatibility
├── network/
│   ├── protocol.ts              Versioned schemas and message types
│   ├── room-code.ts             Generate, normalize, and format codes
│   ├── transport.ts             Framework-neutral client interface
│   ├── party-transport.ts       The only client PartySocket import
│   ├── clock-sync.ts
│   ├── prediction.ts
│   └── snapshot-buffer.ts
├── vehicle/
│   └── remote-car-view.ts       Remote mesh and effects presentation
└── modes/pvp/
    ├── index.ts
    ├── pvp-controller.ts
    ├── pvp-hud.ts
    ├── lobby-controller.ts
    └── remote-player-registry.ts

worker/
├── index.ts                     API, PartyServer routes, asset fallback
├── pvp-room.ts                  Thin PartyServer/Durable Object adapter
├── room-api.ts                  Create, join, settings, and leave
├── auth.ts                      Capability issue and verification
├── rate-limit.ts
└── env.ts
```

Do not add an ECS, actor hierarchy, or generic multiplayer framework. `match-engine.ts` is a driving-specific set of vehicle states. `remote-player-registry.ts` is a PvP presentation concern, not a generic actor registry.

The browser's existing `PlayerController` becomes a presentation/input adapter around the shared simulation. Audio, smoke, skid marks, wheel animation, and camera feedback consume simulation events but never modify physical state.

Map authoring remains the source of truth. A build-time or import-time compiler emits a compact collision manifest of static obstacles, pavement, boundary, spawn slots, and a stable hash. Both browser and Worker consume that manifest. Visual Three.js construction remains browser-only.

Exact bit-level browser/Worker determinism is not required because the server reconciles clients, but the same initial state and input trace should remain numerically close and produce the same discrete events. Use plain numbers, fixed steps, stable player-ID ordering, and no `performance.now()`, random physics, DOM, audio, or Three.js dependencies in the simulation package.

## Runtime composition

Multiplayer is a session/transport concern; PvP is a game mode.

The top-level runtime should eventually compose either:

```text
OfflineSession
  └── local simulation + Cruise/Chase controller

NetworkSession
  ├── room transport
  ├── local predicted simulation
  ├── authoritative reconciliation
  └── PvP mode controller + remote views
```

Do not force Cruise and Chase through network abstractions. Do not make the creator's browser a special simulation path. The PvP controller receives a narrow network session service and a remote-player registry while existing modes retain their current offline context.

## Network timing

Recommended first tuning:

| Concern | Initial value |
|---|---:|
| Authoritative physics | fixed 60 Hz |
| Client input frames | 30 Hz, plus immediate changes |
| Server snapshots | 20 Hz |
| Local prediction/render | display refresh |
| Remote interpolation | 100 ms adaptive buffer |
| Maximum extrapolation | 100–150 ms |
| Reconnect seat grace | 15–30 seconds |
| Initial room capacity | 4 |

A 60 Hz server step preserves the current handling resolution and reduces tunneling for paired-circle collisions. Client prediction hides local input latency, so snapshots do not need to run at render frequency.

An active match should use a self-scheduled fixed-step loop and accept that the Durable Object remains active and billable. Stop the loop when the room is only a lobby, paused, or empty so Hibernation can evict memory. Do not use Durable Object alarms as physics ticks. Alarms handle room expiry and abandoned-seat deadlines.

Cap catch-up work after a delayed event. A room that cannot sustain its tick budget should report an overrun rather than attempting an unbounded simulation burst.

## Prediction, reconciliation, and interpolation

The local browser:

1. samples input into a numbered state frame;
2. applies it immediately to the local predicted simulation;
3. retains unacknowledged frames;
4. receives the authoritative state and last processed sequence;
5. rewinds to the authoritative state;
6. reapplies newer inputs;
7. visually smooths small corrections over roughly 80–120 ms;
8. snaps immediately for resets, epoch changes, or unsafe divergence.

Remote vehicles render from a timestamped snapshot buffer slightly in the past. Short gaps may extrapolate conservatively, but a remote car should freeze or coast after the maximum window rather than diverging indefinitely.

Do not rewind solid vehicles for lag-compensated collisions. Server-current collision state is more understandable than being reset by a car that no longer appears nearby. Casual room consistency is more important than aggressive shooter-style lag compensation.

## Protocol

Start with compact, versioned JSON while measuring CPU and bandwidth. Use Zod for lobby/control messages and a bounded hot-path decoder for frequent input. Move snapshots to binary only if profiling justifies the complexity.

Client messages:

```ts
type ClientMessage =
  | { v: 1; t: "ready"; commandId: string }
  | { v: 1; t: "input"; seq: number; clientTick: number; buttons: number }
  | { v: 1; t: "resync"; lastServerTick: number }
  | { v: 1; t: "ping"; id: number; clientTime: number };
```

Server messages:

```ts
type ServerMessage =
  | {
      v: 1;
      t: "welcome";
      epoch: number;
      playerId: string;
      tick: number;
      mapId: GameMapId;
      mapHash: string;
      profileId: DrivingProfileName;
    }
  | { v: 1; t: "presence"; joined: PlayerMeta[]; left: string[] }
  | { v: 1; t: "snapshot"; epoch: number; tick: number; players: NetPlayerState[] }
  | {
      v: 1;
      t: "reset";
      collisionId: string;
      playerId: string;
      resetSerial: number;
      tick: number;
      reason: "world" | "boundary" | "vehicle";
      spawn: NetTransform;
    }
  | { v: 1; t: "pong"; id: number; clientTime: number; serverTime: number }
  | { v: 1; t: "error"; code: string; terminal: boolean };
```

Input is a current control bitset, not raw keyboard events. Identity comes from the authenticated WebSocket connection, never the payload. Snapshots acknowledge each player's latest accepted input sequence.

PartySocket reconnection must not replay stale driving input. Clear queued input on reconnect, authenticate again, receive a full snapshot, discard prediction history, and then send only the current control state. Reliable lobby commands use idempotency IDs.

## Room routing and codes

Suggested same-origin routes:

```text
POST /api/drive/rooms
POST /api/drive/rooms/:code/join
POST /api/drive/rooms/:code/settings
POST /api/drive/rooms/:code/leave
GET  /parties/pvp/:roomCode
```

Generate codes from an alphabet without ambiguous characters. Eight base-32 characters provide about 40 bits of room space. Format the display with a hyphen, but normalize before lookup.

The outer Worker validates method, origin, body size, code shape, ticket, and coarse rate limits before the request reaches the room. It issues a short-lived signed join capability tied to room generation, player ID, role, protocol version, expiry, and nonce.

There is no global room directory in the first version. Deterministic name lookup avoids an extra stateful hop. The room initialization operation must atomically reject a code that is already live.

## Durable Object placement and fastest shared experience

A room is placed near the request that first creates its Durable Object and does not currently relocate. Therefore:

- let the creator's real create request instantiate the object;
- never pre-create rooms from CI, an alarm, or an admin location;
- default to creator-near placement for local friend groups;
- measure and show each participant's RTT in the lobby;
- add an explicit broad region selector only after geographically distributed play is observed;
- warn before starting a room with extreme RTT spread.

Location hints are best effort. Jurisdictions are compliance restrictions, not latency controls. A single authoritative room cannot remove intercontinental speed-of-light latency.

## Hibernation, persistence, and room lifecycle

Use PartyServer's hibernation support backed by Cloudflare's WebSocket Hibernation API. Class fields may disappear whenever an idle room hibernates, so connection identity belongs in serialized connection state and durable room metadata belongs in SQLite-backed Durable Object storage.

Persist:

- schema/protocol version;
- room generation, creation, and expiry;
- map/profile/control policy and capacity;
- lobby administrator and player seat records;
- reconnect-secret hashes;
- phase, match epoch, reset counts, and final results.

Do not persist every input, tick, or snapshot. For the first release, an unexpected active-room restart increments the epoch, respawns players, and emits `match-restarted`. Add periodic compact checkpoints only if measured deploy/restart disruption warrants their cost and complexity.

Suggested lifecycle:

- disconnected seat grace: 15–30 seconds;
- empty active room: stop simulation immediately;
- empty room expiry: 15–60 minutes;
- one Durable Object alarm schedules the next room/seat deadline;
- alarm handlers are idempotent.

## Security and abuse controls

- Exact origin checks before WebSocket upgrade.
- Signed short-lived join capabilities.
- Secure same-origin anonymous identity cookie or equivalent session.
- No trusted client transforms, collisions, resets, scores, or settings.
- Maximum input frame around 1 KiB and approximately 40 accepted input frames/sec with a small burst.
- Monotonic sequence checks and bounded tick windows.
- Strict room capacity and display-name limits.
- Edge rate limits for room creation, code guessing, joins, and upgrades.
- In-room exact token buckets per connection.
- Terminal close codes for invalid version, deleted room, expired capability, or abuse.
- Turnstile only for creation or repeated suspicious joins, not routine reconnects.
- Never log raw capabilities, reconnect credentials, or unredacted room-code query strings.

## Deployment in this repository

Keep one Worker deployment initially. Add a Worker entrypoint while continuing to serve Astro assets:

```text
lukasmurdock.com
├── static assets and pages
├── /api/drive/rooms/*
└── /parties/pvp/:roomCode
```

The future Wrangler configuration needs:

- `main: "worker/index.ts"`;
- an assets binding and selective `run_worker_first` routes;
- a SQLite-backed PvP room Durable Object binding/class declaration;
- observability;
- separate staging and production bindings;
- secrets for room naming and capability signing.

Cloudflare's 2026 documentation introduces declarative Durable Object class exports while current PartyServer examples still show bindings and legacy migrations. Verify the installed PartyServer release, Wrangler schema, and current migration instructions at implementation time rather than copying either form blindly.

## Testing and launch gates

Pure simulation tests:

- fixed-step output independent of render cadence;
- same input trace produces the same discrete events;
- static collision resets only the affected player;
- vehicle collision never invokes a room/world reset;
- reset and collision events are idempotent;
- deterministic player-pair ordering;
- protected spawns cannot immediately collide;
- stable map manifest hashes.

Protocol tests:

- malformed, oversized, duplicate, stale, future, and out-of-order input;
- explicit version rejection;
- reconnect discards stale input;
- full snapshot and resync behavior;
- terminal close codes stop reconnection.

Durable Object integration tests:

- room isolation by code;
- create/join races and capacity;
- invalid/cross-room capability rejection;
- Hibernation reconstruction;
- expiry alarm and reconnect grace;
- object restart and epoch change;
- targeted collision/reset broadcasts;
- static asset fallback alongside room routes.

Browser/network tests:

- two to eight isolated contexts;
- 50, 100, and 200 ms RTT plus jitter/stalls;
- refresh, offline/online, background tabs, and server deploy;
- mobile touch prediction;
- stale map hash;
- one player collision while every other player and the world continue.

Release gates should use measured P95 room RTT, correction distance, tick overruns, snapshot bytes, abnormal disconnects, and reconnect success rather than local feel alone.

## Incremental implementation

1. **Extract the headless simulation.** Preserve current driving feel with recorded input traces.
2. **Compile map collision manifests.** Hash and validate browser/server parity.
3. **Add a loopback transport.** Build lobby, PvP controller, remote cars, targeted reset flow, interpolation, and prediction without networking.
4. **Add PartyServer and PartySocket adapters in staging.** Implement code creation/join, capability auth, room lifecycle, and reconnect.
5. **Ship non-colliding ghosts privately.** Measure real RTT, message rates, and smoothing.
6. **Run shadow authority.** Compare server simulation to client prediction without enforcing it.
7. **Enable authoritative movement.** One map, one profile, automatic controls, four players.
8. **Enable server-owned PvP collisions.** Add spawn protection and targeted reset telemetry.
9. **Canary and expand.** Move toward eight players and additional maps only after profiling.

The first engineering milestone should be a pure, fixed-step driving simulation with targeted resets and deterministic replay tests. Sockets and lobby UI come after that boundary is proven.

## Primary sources

- [Cloudflare Durable Objects overview](https://developers.cloudflare.com/durable-objects/)
- [Durable Object namespace and naming](https://developers.cloudflare.com/durable-objects/api/namespace/)
- [Durable Object WebSocket Hibernation](https://developers.cloudflare.com/durable-objects/best-practices/websockets/)
- [Durable Object lifecycle](https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/)
- [Durable Object data location](https://developers.cloudflare.com/durable-objects/reference/data-location/)
- [Durable Object limits](https://developers.cloudflare.com/durable-objects/platform/limits/)
- [Durable Object pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/)
- [Workers Static Assets routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/)
- [Cloudflare PartyKit repository](https://github.com/cloudflare/partykit)
- [PartyServer package](https://github.com/cloudflare/partykit/tree/main/packages/partyserver)
- [PartySocket package](https://github.com/cloudflare/partykit/tree/main/packages/partysocket)
- [Legacy PartyKit documentation](https://docs.partykit.io/)
