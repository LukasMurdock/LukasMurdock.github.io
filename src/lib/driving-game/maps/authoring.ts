import type {
  BuildingDefinition,
  GameMapDefinition,
  GroundPatchDefinition,
  ParkingLotDefinition,
  PropDefinition,
  RoadCorridorDefinition,
  RoadSegmentDefinition,
} from "./types";

export type Point2 = { x: number; z: number };

export type MapStamp = {
  parkingLots?: readonly ParkingLotDefinition[];
  groundPatches?: readonly GroundPatchDefinition[];
  buildings?: readonly BuildingDefinition[];
  trees?: readonly PropDefinition[];
  streetlights?: readonly PropDefinition[];
  barriers?: readonly PropDefinition[];
};

type StampPlacement = {
  id: string;
  at: Point2;
  heading?: number;
  stamp: MapStamp;
};

export type DrivingMapSource = Omit<
  GameMapDefinition,
  "roads" | "corridors" | "parkingLots" | "groundPatches" | "buildings" | "trees" | "streetlights" | "barriers"
> & {
  roads?: readonly RoadSegmentDefinition[];
  corridors: readonly RoadCorridorDefinition[];
  districts?: readonly StampPlacement[];
  parkingLots?: readonly ParkingLotDefinition[];
  groundPatches?: readonly GroundPatchDefinition[];
  buildings?: readonly BuildingDefinition[];
  trees?: readonly PropDefinition[];
  streetlights?: readonly PropDefinition[];
  barriers?: readonly PropDefinition[];
};

export function defineDrivingMap(source: DrivingMapSource): GameMapDefinition {
  validateSource(source);
  const expanded = source.districts?.map(expandStamp) ?? [];
  const map: GameMapDefinition = {
    id: source.id,
    title: source.title,
    description: source.description,
    worldLimit: source.worldLimit,
    groundSize: source.groundSize,
    environment: source.environment,
    roads: source.roads ?? [],
    corridors: source.corridors,
    parkingLots: [...(source.parkingLots ?? []), ...expanded.flatMap((stamp) => stamp.parkingLots)],
    groundPatches: [...(source.groundPatches ?? []), ...expanded.flatMap((stamp) => stamp.groundPatches)],
    buildings: [...(source.buildings ?? []), ...expanded.flatMap((stamp) => stamp.buildings)],
    trees: [...(source.trees ?? []), ...expanded.flatMap((stamp) => stamp.trees)],
    streetlights: [...(source.streetlights ?? []), ...expanded.flatMap((stamp) => stamp.streetlights)],
    barriers: [...(source.barriers ?? []), ...expanded.flatMap((stamp) => stamp.barriers)],
    circuit: source.circuit,
    chasePlacement: source.chasePlacement,
    spawn: source.spawn,
  };
  validateCompiledContent(map);
  return map;
}

export function placeStamp(id: string, stamp: MapStamp, at: Point2, heading = 0): StampPlacement {
  return { id, stamp, at, heading };
}

export function freightRow(options: {
  sheds: number;
  shedSize: readonly [number, number];
  gap: number;
  colors: readonly number[];
}): MapStamp {
  const [width, depth] = options.shedSize;
  const totalDepth = options.sheds * depth + (options.sheds - 1) * options.gap;
  return {
    buildings: Array.from({ length: options.sheds }, (_, index) => ({
      x: 0,
      z: -totalDepth / 2 + depth / 2 + index * (depth + options.gap),
      width,
      depth,
      height: 5 + index % 2 * 0.7,
      color: options.colors[index % options.colors.length],
      style: "freight" as const,
    })),
    streetlights: Array.from({ length: options.sheds }, (_, index) => ({
      x: width / 2 + 4.5,
      z: -totalDepth / 2 + depth / 2 + index * (depth + options.gap),
    })),
  };
}

export function serviceYard(options: {
  width: number;
  depth: number;
  color: number;
}): MapStamp {
  return {
    parkingLots: [{ x: 0, z: 0, width: options.width, depth: options.depth }],
    buildings: [
      {
        x: -options.width * 0.3,
        z: 0,
        width: 20,
        depth: options.depth * 0.58,
        height: 7,
        color: options.color,
        style: "hangar",
      },
      {
        x: options.width * 0.32,
        z: options.depth * 0.22,
        width: 13,
        depth: 18,
        height: 5,
        color: 0xb98260,
        style: "freight",
      },
    ],
    streetlights: [
      { x: -options.width * 0.43, z: -options.depth * 0.4 },
      { x: options.width * 0.43, z: options.depth * 0.4 },
    ],
    barriers: [
      { x: -5, z: -options.depth / 2 + 2 },
      { x: 5, z: -options.depth / 2 + 2 },
    ],
  };
}

export function openReversal(radius: number): MapStamp {
  return {
    parkingLots: [{ x: 0, z: 0, width: radius * 2, depth: radius * 2 }],
    barriers: [
      { x: -radius + 5, z: -radius + 5 },
      { x: radius - 5, z: -radius + 5 },
      { x: -radius + 5, z: radius - 5 },
      { x: radius - 5, z: radius - 5 },
    ],
  };
}

export function civicBlock(options: { width: number; depth: number; colors: readonly number[] }): MapStamp {
  const insetX = options.width * 0.3;
  const insetZ = options.depth * 0.3;
  return {
    parkingLots: [{ x: 0, z: 0, width: options.width, depth: options.depth }],
    buildings: [
      { x: -insetX, z: -insetZ, width: 20, depth: 18, height: 16, color: options.colors[0] },
      { x: insetX, z: -insetZ, width: 18, depth: 18, height: 10, color: options.colors[1 % options.colors.length] },
      { x: -insetX, z: insetZ, width: 18, depth: 20, height: 12, color: options.colors[2 % options.colors.length] },
      { x: insetX, z: insetZ, width: 22, depth: 18, height: 20, color: options.colors[3 % options.colors.length] },
    ],
    streetlights: [
      { x: 0, z: -options.depth * 0.42 },
      { x: 0, z: options.depth * 0.42 },
    ],
  };
}

export function shoppingPlaza(options: { width: number; depth: number; color: number }): MapStamp {
  return {
    parkingLots: [{ x: 0, z: 0, width: options.width, depth: options.depth }],
    buildings: [{
      x: 0,
      z: options.depth * 0.31,
      width: options.width * 0.74,
      depth: options.depth * 0.24,
      height: 8,
      color: options.color,
    }],
    barriers: [
      { x: -8, z: -options.depth * 0.42 },
      { x: 8, z: -options.depth * 0.42 },
    ],
    streetlights: [
      { x: -options.width * 0.34, z: -options.depth * 0.25 },
      { x: options.width * 0.34, z: -options.depth * 0.25 },
    ],
  };
}

export function constructionYard(options: { width: number; depth: number }): MapStamp {
  return {
    groundPatches: [{ x: 0, z: 0, width: options.width, depth: options.depth, color: 0x8c7957 }],
    buildings: [
      { x: -options.width * 0.28, z: 0, width: 12, depth: 24, height: 5, color: 0xb9865f, style: "freight" },
      { x: options.width * 0.28, z: options.depth * 0.18, width: 10, depth: 18, height: 4, color: 0x728c86, style: "freight" },
    ],
    barriers: [
      { x: -8, z: -options.depth / 2 + 2 },
      { x: 0, z: -options.depth / 2 + 2 },
      { x: 8, z: -options.depth / 2 + 2 },
    ],
  };
}

export function containerYard(options: {
  rows: number;
  columns: number;
  colors: readonly number[];
}): MapStamp {
  const spacingX = 18;
  const spacingZ = 28;
  return {
    parkingLots: [{
      x: 0,
      z: 0,
      width: options.columns * spacingX + 20,
      depth: options.rows * spacingZ + 20,
    }],
    buildings: Array.from({ length: options.rows * options.columns }, (_, index) => {
      const column = index % options.columns;
      const row = Math.floor(index / options.columns);
      return {
        x: (column - (options.columns - 1) / 2) * spacingX,
        z: (row - (options.rows - 1) / 2) * spacingZ,
        width: 8,
        depth: 18,
        height: 4.2,
        color: options.colors[index % options.colors.length],
        style: "freight" as const,
      };
    }),
  };
}

export function roadsideSettlement(options: { buildings: number; colors: readonly number[] }): MapStamp {
  return {
    buildings: Array.from({ length: options.buildings }, (_, index) => ({
      x: (index - (options.buildings - 1) / 2) * 25,
      z: 0,
      width: 16,
      depth: 18,
      height: 7 + index % 3 * 2,
      color: options.colors[index % options.colors.length],
    })),
    streetlights: Array.from({ length: Math.max(1, options.buildings - 1) }, (_, index) => ({
      x: (index - (options.buildings - 2) / 2) * 25 + 12.5,
      z: -13,
    })),
  };
}

export function corridorSidePoints(
  corridors: readonly RoadCorridorDefinition[],
  options: { spacing: number; shoulderOffset: number },
): PropDefinition[] {
  const points: PropDefinition[] = [];
  let side = -1;
  for (const corridor of corridors) {
    for (let index = 1; index < corridor.points.length; index++) {
      const start = corridor.points[index - 1];
      const end = corridor.points[index];
      const dx = end.x - start.x;
      const dz = end.z - start.z;
      const length = Math.hypot(dx, dz);
      const rightX = dz / length;
      const rightZ = -dx / length;
      const offset = corridor.width / 2 + options.shoulderOffset;
      for (let distance = options.spacing / 2; distance < length - options.spacing / 3; distance += options.spacing) {
        points.push({
          x: start.x + dx * distance / length + rightX * offset * side,
          z: start.z + dz * distance / length + rightZ * offset * side,
        });
        side *= -1;
      }
    }
  }
  return points;
}

export function scatterPoints(options: {
  seed: number;
  count: number;
  bounds: { minX: number; maxX: number; minZ: number; maxZ: number };
  minimumSpacing: number;
  avoidCorridors?: readonly RoadCorridorDefinition[];
  pavementClearance?: number;
}): PropDefinition[] {
  let state = options.seed >>> 0;
  const random = () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
  const points: PropDefinition[] = [];
  const attempts = options.count * 30;
  for (let attempt = 0; attempt < attempts && points.length < options.count; attempt++) {
    const point = {
      x: lerp(options.bounds.minX, options.bounds.maxX, random()),
      z: lerp(options.bounds.minZ, options.bounds.maxZ, random()),
    };
    if (points.some((other) => distanceSquared(point, other) < options.minimumSpacing ** 2)) continue;
    if ((options.avoidCorridors ?? []).some((corridor) => {
      const clearance = corridor.width / 2 + (options.pavementClearance ?? 0);
      for (let index = 1; index < corridor.points.length; index++) {
        if (distanceToSegmentSquared(point, corridor.points[index - 1], corridor.points[index]) <= clearance ** 2) {
          return true;
        }
      }
      return false;
    })) continue;
    points.push(point);
  }
  return points;
}

function expandStamp(placement: StampPlacement): Required<MapStamp> {
  const heading = placement.heading ?? 0;
  const transformPoint = (point: Point2) => ({
    x: placement.at.x + Math.cos(heading) * point.x + Math.sin(heading) * point.z,
    z: placement.at.z - Math.sin(heading) * point.x + Math.cos(heading) * point.z,
  });
  return {
    parkingLots: (placement.stamp.parkingLots ?? []).map((lot) => ({
      ...lot,
      ...transformPoint(lot),
      rotation: (lot.rotation ?? 0) + heading,
    })),
    groundPatches: (placement.stamp.groundPatches ?? []).map((patch) => ({
      ...patch,
      ...transformPoint(patch),
      rotation: (patch.rotation ?? 0) + heading,
    })),
    buildings: (placement.stamp.buildings ?? []).map((building) => ({
      ...building,
      ...transformPoint(building),
      rotation: (building.rotation ?? 0) + heading,
    })),
    trees: (placement.stamp.trees ?? []).map((point) => transformPoint(point)),
    streetlights: (placement.stamp.streetlights ?? []).map((point) => transformPoint(point)),
    barriers: (placement.stamp.barriers ?? []).map((point) => transformPoint(point)),
  };
}

function validateSource(source: DrivingMapSource) {
  if (!Number.isFinite(source.worldLimit) || source.worldLimit <= 0) {
    throw new Error(`Map "${source.id}" needs a positive world limit.`);
  }
  if (source.groundSize < source.worldLimit * 2) {
    throw new Error(`Map "${source.id}" ground does not cover its boundary.`);
  }
  if (source.spawn.source === "position") {
    if (Math.abs(source.spawn.x) >= source.worldLimit || Math.abs(source.spawn.z) >= source.worldLimit) {
      throw new Error(`Map "${source.id}" spawn is outside its boundary.`);
    }
  }
  const districtIds = new Set<string>();
  for (const district of source.districts ?? []) {
    if (districtIds.has(district.id)) throw new Error(`Map "${source.id}" repeats district "${district.id}".`);
    districtIds.add(district.id);
  }
  const corridorIds = new Set<string>();
  for (const corridor of source.corridors) {
    if (corridorIds.has(corridor.id)) throw new Error(`Map "${source.id}" repeats corridor "${corridor.id}".`);
    corridorIds.add(corridor.id);
    if (corridor.points.length < 2 || corridor.width <= 0) {
      throw new Error(`Map "${source.id}" corridor "${corridor.id}" is invalid.`);
    }
    for (const point of corridor.points) {
      if (!Number.isFinite(point.x) || !Number.isFinite(point.z)) {
        throw new Error(`Map "${source.id}" corridor "${corridor.id}" has non-finite coordinates.`);
      }
      if (Math.abs(point.x) + corridor.width / 2 >= source.worldLimit
        || Math.abs(point.z) + corridor.width / 2 >= source.worldLimit) {
        throw new Error(`Map "${source.id}" corridor "${corridor.id}" crosses the boundary.`);
      }
    }
  }
}

function validateCompiledContent(map: GameMapDefinition) {
  const assertPoint = (kind: string, point: Point2, clearance = 0) => {
    if (!Number.isFinite(point.x) || !Number.isFinite(point.z)) {
      throw new Error(`Map "${map.id}" has non-finite ${kind} coordinates.`);
    }
    if (Math.abs(point.x) + clearance >= map.worldLimit || Math.abs(point.z) + clearance >= map.worldLimit) {
      throw new Error(`Map "${map.id}" ${kind} crosses the boundary.`);
    }
  };
  map.parkingLots.forEach((lot) => assertPoint("parking lot", lot, Math.hypot(lot.width, lot.depth) / 2));
  map.groundPatches?.forEach((patch) => assertPoint(
    "ground patch",
    patch,
    Math.hypot(patch.width, patch.depth) / 2,
  ));
  map.buildings.forEach((building) => assertPoint(
    "building",
    building,
    Math.hypot(building.width, building.depth) / 2,
  ));
  map.trees.forEach((point) => assertPoint("tree", point, 2.4));
  map.streetlights.forEach((point) => assertPoint("streetlight", point, 1.3));
  map.barriers.forEach((point) => assertPoint("barrier", point, 1.5));
  for (const area of [
    ...(map.chasePlacement?.preferredAreas ?? []),
    ...(map.chasePlacement?.noSpawnAreas ?? []),
  ]) {
    if (area.kind === "circle") {
      assertPoint("Chase placement area", area, area.radius);
      continue;
    }
    const rotation = area.rotation ?? 0;
    const extentX = Math.abs(Math.cos(rotation)) * area.width / 2
      + Math.abs(Math.sin(rotation)) * area.depth / 2;
    const extentZ = Math.abs(Math.sin(rotation)) * area.width / 2
      + Math.abs(Math.cos(rotation)) * area.depth / 2;
    if (Math.abs(area.x) + extentX >= map.worldLimit || Math.abs(area.z) + extentZ >= map.worldLimit) {
      throw new Error(`Map "${map.id}" Chase placement area crosses the boundary.`);
    }
  }
}

function distanceSquared(a: Point2, b: Point2) {
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  return dx * dx + dz * dz;
}

function distanceToSegmentSquared(point: Point2, start: Point2, end: Point2) {
  const dx = end.x - start.x;
  const dz = end.z - start.z;
  const lengthSquared = dx * dx + dz * dz;
  if (lengthSquared === 0) return distanceSquared(point, start);
  const t = Math.max(0, Math.min(1, ((point.x - start.x) * dx + (point.z - start.z) * dz) / lengthSquared));
  return distanceSquared(point, { x: start.x + dx * t, z: start.z + dz * t });
}

function lerp(a: number, b: number, amount: number) {
  return a + (b - a) * amount;
}
