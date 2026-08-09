import * as THREE from "three";
import type { RoadCorridorDefinition } from "../maps/types";

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

export function corridorMarks(corridor: RoadCorridorDefinition): RoadMarkDefinition[] {
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
