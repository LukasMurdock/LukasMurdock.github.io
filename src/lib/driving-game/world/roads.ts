import * as THREE from "three";
import type { RoadCorridorDefinition } from "../maps/types";

export type CorridorJunction = {
  x: number;
  z: number;
  radius: number;
};

export type RoadMarkDefinition = {
  x: number;
  z: number;
  width: number;
  depth: number;
  rotation?: number;
};

export function createCorridorMesh(
  corridor: RoadCorridorDefinition,
  material: THREE.Material,
  elevation = 0.105,
) {
  const positions: number[] = [];
  const indices: number[] = [];
  const points = corridor.points;
  const halfWidth = corridor.width / 2;

  for (let index = 0; index < points.length; index++) {
    const current = points[index];
    const previous = points[Math.max(0, index - 1)];
    const next = points[Math.min(points.length - 1, index + 1)];
    const incoming = normalize(current.x - previous.x, current.z - previous.z);
    const outgoing = normalize(next.x - current.x, next.z - current.z);
    if (index === 0) incoming.set(outgoing.x, outgoing.z);
    if (index === points.length - 1) outgoing.set(incoming.x, incoming.z);
    const rightIncoming = { x: incoming.z, z: -incoming.x };
    const rightOutgoing = { x: outgoing.z, z: -outgoing.x };
    const miter = normalize(rightIncoming.x + rightOutgoing.x, rightIncoming.z + rightOutgoing.z);
    const denominator = miter.x * rightOutgoing.x + miter.z * rightOutgoing.z;
    const safeDenominator = Math.abs(denominator) < 0.25 ? Math.sign(denominator || 1) * 0.25 : denominator;
    const miterLength = THREE.MathUtils.clamp(halfWidth / safeDenominator, -halfWidth * 2, halfWidth * 2);
    let centerX = current.x;
    let centerZ = current.z;
    if (index === 0) {
      centerX -= outgoing.x * halfWidth;
      centerZ -= outgoing.z * halfWidth;
    } else if (index === points.length - 1) {
      centerX += incoming.x * halfWidth;
      centerZ += incoming.z * halfWidth;
    }
    positions.push(
      centerX + miter.x * miterLength, elevation, centerZ + miter.z * miterLength,
      centerX - miter.x * miterLength, elevation, centerZ - miter.z * miterLength,
    );
    if (index === 0) continue;
    const previousPair = (index - 1) * 2;
    const pair = index * 2;
    indices.push(previousPair, previousPair + 1, pair + 1, previousPair, pair + 1, pair);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = `corridor:${corridor.id}`;
  mesh.receiveShadow = true;
  return mesh;
}

export function compileCorridorJunctions(
  corridors: readonly RoadCorridorDefinition[],
): CorridorJunction[] {
  const junctions: CorridorJunction[] = [];
  for (let firstIndex = 0; firstIndex < corridors.length; firstIndex++) {
    const first = corridors[firstIndex];
    for (let secondIndex = firstIndex + 1; secondIndex < corridors.length; secondIndex++) {
      const second = corridors[secondIndex];
      for (let firstSegment = 1; firstSegment < first.points.length; firstSegment++) {
        for (let secondSegment = 1; secondSegment < second.points.length; secondSegment++) {
          const intersection = segmentIntersection(
            first.points[firstSegment - 1],
            first.points[firstSegment],
            second.points[secondSegment - 1],
            second.points[secondSegment],
          );
          if (!intersection) continue;
          addJunction(junctions, {
            ...intersection,
            radius: Math.max(first.width, second.width) * 0.72,
          });
        }
      }
    }
  }
  return junctions;
}

export function addJunctionBatch(
  scene: THREE.Object3D,
  junctions: readonly CorridorJunction[],
  material: THREE.Material,
  elevation: number,
) {
  if (junctions.length === 0) return;
  const geometry = new THREE.CylinderGeometry(1, 1, 0.018, 18);
  const instances = new THREE.InstancedMesh(geometry, material, junctions.length);
  instances.name = "corridor-junctions";
  const matrix = new THREE.Matrix4();
  junctions.forEach((junction, index) => {
    matrix.compose(
      new THREE.Vector3(junction.x, elevation, junction.z),
      new THREE.Quaternion(),
      new THREE.Vector3(junction.radius, 1, junction.radius),
    );
    instances.setMatrixAt(index, matrix);
  });
  instances.instanceMatrix.needsUpdate = true;
  instances.computeBoundingSphere();
  instances.receiveShadow = true;
  scene.add(instances);
}

export function corridorMarks(
  corridor: RoadCorridorDefinition,
  junctions: readonly CorridorJunction[] = [],
): RoadMarkDefinition[] {
  if (!corridor.markings) return [];
  const marks: RoadMarkDefinition[] = [];
  const step = corridor.markings === "taxiway" ? 13 : 7;
  for (let index = 1; index < corridor.points.length; index++) {
    const start = corridor.points[index - 1];
    const end = corridor.points[index];
    const dx = end.x - start.x;
    const dz = end.z - start.z;
    const length = Math.hypot(dx, dz);
    const heading = Math.atan2(dx, dz);
    const dashLength = corridor.markings === "taxiway" ? 5.5 : 3.3;
    for (let distance = step / 2; distance < length - step / 3; distance += step) {
      const centerX = start.x + dx * distance / length;
      const centerZ = start.z + dz * distance / length;
      const insideJunction = junctions.some((junction) => (
        (centerX - junction.x) ** 2 + (centerZ - junction.z) ** 2
          <= (junction.radius + dashLength * 0.55) ** 2
      ));
      if (insideJunction) continue;
      if (corridor.markings === "taxiway") {
        const edge = corridor.width / 2 - 0.8;
        const rightX = dz / length;
        const rightZ = -dx / length;
        for (const side of [-1, 1]) {
          marks.push({
            x: centerX + rightX * edge * side,
            z: centerZ + rightZ * edge * side,
            width: 0.16,
            depth: dashLength,
            rotation: heading,
          });
        }
      } else {
        marks.push({
          x: centerX,
          z: centerZ,
          width: 0.12,
          depth: dashLength,
          rotation: heading,
        });
      }
    }
  }
  return marks;
}

export function addMarkingBatch(
  scene: THREE.Object3D,
  marks: readonly RoadMarkDefinition[],
  material: THREE.Material,
  name: string,
) {
  if (marks.length === 0) return;
  const instances = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 0.018, 1), material, marks.length);
  instances.name = name;
  const matrix = new THREE.Matrix4();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  marks.forEach((mark, index) => {
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), mark.rotation ?? 0);
    scale.set(mark.width, 1, mark.depth);
    matrix.compose(new THREE.Vector3(mark.x, 0.145, mark.z), quaternion, scale);
    instances.setMatrixAt(index, matrix);
  });
  instances.instanceMatrix.needsUpdate = true;
  instances.computeBoundingSphere();
  scene.add(instances);
}

function addJunction(junctions: CorridorJunction[], candidate: CorridorJunction) {
  const existing = junctions.find((junction) => (
    (junction.x - candidate.x) ** 2 + (junction.z - candidate.z) ** 2 < 4
  ));
  if (existing) {
    existing.radius = Math.max(existing.radius, candidate.radius);
    return;
  }
  junctions.push(candidate);
}

function segmentIntersection(
  a: { x: number; z: number },
  b: { x: number; z: number },
  c: { x: number; z: number },
  d: { x: number; z: number },
) {
  const abX = b.x - a.x;
  const abZ = b.z - a.z;
  const cdX = d.x - c.x;
  const cdZ = d.z - c.z;
  const denominator = abX * cdZ - abZ * cdX;
  if (Math.abs(denominator) < 0.0001) {
    for (const first of [a, b]) {
      for (const second of [c, d]) {
        if ((first.x - second.x) ** 2 + (first.z - second.z) ** 2 < 0.01) {
          return { x: (first.x + second.x) / 2, z: (first.z + second.z) / 2 };
        }
      }
    }
    return null;
  }
  const acX = c.x - a.x;
  const acZ = c.z - a.z;
  const firstAmount = (acX * cdZ - acZ * cdX) / denominator;
  const secondAmount = (acX * abZ - acZ * abX) / denominator;
  const epsilon = 0.0001;
  if (
    firstAmount < -epsilon || firstAmount > 1 + epsilon
    || secondAmount < -epsilon || secondAmount > 1 + epsilon
  ) return null;
  return { x: a.x + abX * firstAmount, z: a.z + abZ * firstAmount };
}

function normalize(x: number, z: number) {
  const length = Math.hypot(x, z);
  if (length < 0.0001) return new MutablePoint(0, 1);
  return new MutablePoint(x / length, z / length);
}

class MutablePoint {
  constructor(public x: number, public z: number) {}
  set(x: number, z: number) {
    this.x = x;
    this.z = z;
  }
}
