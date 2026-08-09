import * as THREE from "three";
import type { GameMapDefinition } from "../maps";
import type { CircuitPhrase } from "../maps/types";
import { addBuilding } from "./buildings";
import { addBarrier, addStreetlight, addTree } from "./props";
import type { Obstacle, WorldRuntime } from "./types";

export type { Obstacle, WorldRuntime } from "./types";

const UP = new THREE.Vector3(0, 1, 0);


function createFacetedGround(size: number, baseColor: number) {
  const geometry = new THREE.PlaneGeometry(size, size, 14, 14).toNonIndexed();
  const position = geometry.getAttribute("position");
  const colors: number[] = [];
  let randomState = 0x52a93f17;
  const random = () => {
    randomState = (1664525 * randomState + 1013904223) >>> 0;
    return randomState / 4294967296;
  };
  for (let vertex = 0; vertex < position.count; vertex += 3) {
    const color = new THREE.Color(baseColor);
    color.offsetHSL((random() - 0.5) * 0.008, (random() - 0.5) * 0.02, (random() - 0.5) * 0.025);
    for (let corner = 0; corner < 3; corner++) colors.push(color.r, color.g, color.b);
  }
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  return geometry;
}

export function buildWorld(scene: THREE.Scene, map: GameMapDefinition): WorldRuntime {
  const obstacles: Obstacle[] = [];
  const worldRoot = new THREE.Group();
  worldRoot.name = `world:${map.id}`;
  scene.add(worldRoot);
  const grassMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 1,
    vertexColors: true,
    flatShading: true,
  });
  const ground = new THREE.Mesh(createFacetedGround(map.groundSize, map.environment.grass), grassMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  worldRoot.add(ground);

  const roadMaterial = new THREE.MeshStandardMaterial({
    color: map.environment.road,
    roughness: 1,
    flatShading: true,
  });
  const roadSegments = map.roads;
  const course = map.circuit ? buildDriftCircuit(worldRoot, roadMaterial, map.circuit) : null;

  const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xe4bd42 });
  const taxiwayLineMaterial = new THREE.MeshBasicMaterial({
    color: 0xd8cda4,
    opacity: 0.62,
    transparent: true,
    depthWrite: false,
  });
  roadSegments.forEach((road, roadIndex) => {
    const material = road.surfaceColor === undefined
      ? roadMaterial
      : new THREE.MeshStandardMaterial({ color: road.surfaceColor, roughness: 1, flatShading: true });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(road.width, 0.12, road.depth), material);
    mesh.position.set(road.x, 0.04 + roadIndex * 0.002, road.z);
    mesh.rotation.y = road.rotation ?? 0;
    mesh.receiveShadow = true;
    worldRoot.add(mesh);
    if (road.markings === "taxiway") {
      addTaxiwayMarkings(worldRoot, road, taxiwayLineMaterial);
      return;
    }
    if (!road.markings || road.rotation) return;
    if (road.width >= road.depth) {
      for (let x = road.x - road.width / 2 + 5; x <= road.x + road.width / 2 - 5; x += 7) {
        addRoadMark(worldRoot, x, road.z - 0.22, 3.3, 0.1, lineMaterial);
        addRoadMark(worldRoot, x, road.z + 0.22, 3.3, 0.1, lineMaterial);
      }
    } else {
      for (let z = road.z - road.depth / 2 + 5; z <= road.z + road.depth / 2 - 5; z += 7) {
        addRoadMark(worldRoot, road.x - 0.22, z, 0.1, 3.3, lineMaterial);
        addRoadMark(worldRoot, road.x + 0.22, z, 0.1, 3.3, lineMaterial);
      }
    }
  });

  const concreteMaterial = new THREE.MeshStandardMaterial({ color: 0xaaa58a, roughness: 1, flatShading: true });
  const parkingLineMaterial = new THREE.MeshBasicMaterial({ color: 0xd8d7b8 });
  map.parkingLots.forEach((parkingLot) => {
    const curb = new THREE.Mesh(
      new THREE.BoxGeometry(parkingLot.width + 1.4, 0.1, parkingLot.depth + 1.4),
      concreteMaterial,
    );
    curb.position.set(parkingLot.x, 0.045, parkingLot.z);
    curb.receiveShadow = true;
    worldRoot.add(curb);
    const lot = new THREE.Mesh(new THREE.BoxGeometry(parkingLot.width, 0.04, parkingLot.depth), roadMaterial);
    lot.position.set(parkingLot.x, 0.09, parkingLot.z);
    lot.receiveShadow = true;
    worldRoot.add(lot);
    for (let offset = -parkingLot.width / 2 + 2.3; offset < parkingLot.width / 2 - 1; offset += 3.1) {
      addRoadMark(
        worldRoot,
        parkingLot.x + offset,
        parkingLot.z - parkingLot.depth / 2 + 2.1,
        0.09,
        3.6,
        parkingLineMaterial,
      );
      addRoadMark(
        worldRoot,
        parkingLot.x + offset,
        parkingLot.z + parkingLot.depth / 2 - 2.1,
        0.09,
        3.6,
        parkingLineMaterial,
      );
    }
  });

  map.buildings.forEach((building) => addBuilding(
    worldRoot,
    obstacles,
    building.x,
    building.z,
    building.width,
    building.depth,
    building.height,
    building.color,
    building.style,
  ));
  map.trees.forEach(({ x, z }) => addTree(worldRoot, obstacles, x, z));
  map.streetlights.forEach(({ x, z }) => addStreetlight(worldRoot, obstacles, x, z));
  map.barriers.forEach(({ x, z }) => addBarrier(worldRoot, obstacles, x, z));

  let spawnPosition: THREE.Vector3;
  let spawnHeading: number;
  if (map.spawn.source === "circuit") {
    if (!course) throw new Error(`Map "${map.id}" uses a circuit spawn without defining a circuit.`);
    const sampleIndex = map.spawn.sampleIndex ?? 0;
    spawnPosition = course.points[sampleIndex].clone();
    const spawnTangent = course.tangents[sampleIndex];
    spawnHeading = Math.atan2(spawnTangent.x, spawnTangent.z);
  } else {
    spawnPosition = new THREE.Vector3(map.spawn.x, 0.06, map.spawn.z);
    spawnHeading = map.spawn.heading;
  }
  spawnPosition.y = 0.06;
  return {
    spawnPosition,
    spawnHeading,
    isOnPavement(position: THREE.Vector3) {
      const onRoad = roadSegments.some((road) => {
        const rotation = road.rotation ?? 0;
        const dx = position.x - road.x;
        const dz = position.z - road.z;
        const localX = Math.cos(rotation) * dx - Math.sin(rotation) * dz;
        const localZ = Math.sin(rotation) * dx + Math.cos(rotation) * dz;
        return Math.abs(localX) <= road.width / 2
          && Math.abs(localZ) <= road.depth / 2;
      });
      const onParkingLot = map.parkingLots.some((parkingLot) =>
        Math.abs(position.x - parkingLot.x) <= parkingLot.width / 2
        && Math.abs(position.z - parkingLot.z) <= parkingLot.depth / 2
      );
      if (onRoad || onParkingLot) return true;

      if (!course) return false;
      let nearestIndex = 0;
      let nearestDistanceSq = Number.POSITIVE_INFINITY;
      for (let i = 0; i < course.points.length; i++) {
        const dx = position.x - course.points[i].x;
        const dz = position.z - course.points[i].z;
        const distanceSq = dx * dx + dz * dz;
        if (distanceSq < nearestDistanceSq) {
          nearestDistanceSq = distanceSq;
          nearestIndex = i;
        }
      }
      return nearestDistanceSq <= (course.widths[nearestIndex] * 0.5) ** 2;
    },
    queryCollision(position: THREE.Vector3, radius: number) {
      for (const box of obstacles) {
        const closestX = THREE.MathUtils.clamp(position.x, box.minX, box.maxX);
        const closestZ = THREE.MathUtils.clamp(position.z, box.minZ, box.maxZ);
        let dx = position.x - closestX;
        let dz = position.z - closestZ;
        let distanceSq = dx * dx + dz * dz;
        if (distanceSq >= radius * radius) continue;

        if (distanceSq < 0.0001) {
          const nearestEdge = [
            { distance: Math.abs(position.x - box.minX), x: -1, z: 0 },
            { distance: Math.abs(box.maxX - position.x), x: 1, z: 0 },
            { distance: Math.abs(position.z - box.minZ), x: 0, z: -1 },
            { distance: Math.abs(box.maxZ - position.z), x: 0, z: 1 },
          ].sort((a, b) => a.distance - b.distance)[0];
          dx = nearestEdge.x;
          dz = nearestEdge.z;
          distanceSq = 1;
        }

        const distance = Math.sqrt(distanceSq);
        return {
          kind: box.kind,
          normalX: dx / distance,
          normalZ: dz / distance,
          penetration: radius - distance,
          resetsCar: box.resetsCar === true,
        };
      }
      return null;
    },
    isOutsideBoundary(position: THREE.Vector3, radius: number) {
      const limit = map.worldLimit - radius;
      return Math.abs(position.x) > limit || Math.abs(position.z) > limit;
    },
    destroy() {
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      worldRoot.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        geometries.add(object.geometry);
        const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
        objectMaterials.forEach((material) => materials.add(material));
      });
      scene.remove(worldRoot);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      obstacles.length = 0;
    },
  };
}

function buildDriftCircuit(
  scene: THREE.Object3D,
  roadMaterial: THREE.Material,
  grammar: readonly CircuitPhrase[],
) {
  // The map's grammar controls rhythm around a guaranteed non-intersecting polar loop.
  // Radius changes create linked transitions; angular spacing controls how long the player has to set and recover.

  const totalSpan = grammar.reduce((sum, phrase) => sum + phrase.span, 0);
  let angle = -Math.PI / 2;
  const anchors: THREE.Vector3[] = [];
  for (const phrase of grammar) {
    anchors.push(new THREE.Vector3(Math.cos(angle) * phrase.radius, 0.105, Math.sin(angle) * phrase.radius));
    angle += phrase.span / totalSpan * Math.PI * 2;
  }

  const curve = new THREE.CatmullRomCurve3(anchors, true, "centripetal", 0.5);
  const sampleCount = 336;
  const points: THREE.Vector3[] = [];
  const tangents: THREE.Vector3[] = [];
  const widths: number[] = [];
  for (let i = 0; i < sampleCount; i++) {
    const t = i / sampleCount;
    points.push(curve.getPointAt(t));
    tangents.push(curve.getTangentAt(t).setY(0).normalize());
    const phrasePosition = t * grammar.length;
    const phraseIndex = Math.floor(phrasePosition) % grammar.length;
    const nextIndex = (phraseIndex + 1) % grammar.length;
    widths.push(THREE.MathUtils.lerp(grammar[phraseIndex].width, grammar[nextIndex].width, phrasePosition % 1));
  }

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  for (let i = 0; i < sampleCount; i++) {
    const point = points[i];
    const tangent = tangents[i];
    const right = new THREE.Vector3(tangent.z, 0, -tangent.x);
    const halfWidth = widths[i] / 2;
    const edgeA = point.clone().addScaledVector(right, halfWidth);
    const edgeB = point.clone().addScaledVector(right, -halfWidth);
    positions.push(edgeA.x, edgeA.y, edgeA.z, edgeB.x, edgeB.y, edgeB.z);
    uvs.push(0, i / 12, 1, i / 12);

    const next = (i + 1) % sampleCount;
    const a = i * 2;
    const b = a + 1;
    const c = next * 2;
    const d = c + 1;
    indices.push(a, b, d, a, d, c);
  }

  const roadGeometry = new THREE.BufferGeometry();
  roadGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  roadGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  roadGeometry.setIndex(indices);
  roadGeometry.computeVertexNormals();
  const road = new THREE.Mesh(roadGeometry, roadMaterial);
  road.receiveShadow = true;
  scene.add(road);

  const markerMatrix = new THREE.Matrix4();
  const markerQuaternion = new THREE.Quaternion();
  const markerScale = new THREE.Vector3(1, 1, 1);

  // Alternating curbs make entries, apexes, and exits easy to read at speed.
  const curbGeometry = new THREE.BoxGeometry(0.62, 0.1, 1.55);
  const redCurbs = new THREE.InstancedMesh(
    curbGeometry,
    new THREE.MeshStandardMaterial({ color: 0xd94b43, roughness: 0.82 }),
    sampleCount / 4,
  );
  const whiteCurbs = new THREE.InstancedMesh(
    curbGeometry,
    new THREE.MeshStandardMaterial({ color: 0xf4ead8, roughness: 0.82 }),
    sampleCount / 4,
  );
  let redIndex = 0;
  let whiteIndex = 0;
  for (let i = 0; i < sampleCount; i += 4) {
    const tangent = tangents[i];
    const right = new THREE.Vector3(tangent.z, 0, -tangent.x);
    markerQuaternion.setFromAxisAngle(UP, Math.atan2(tangent.x, tangent.z));
    for (const side of [-1, 1]) {
      const curbPosition = points[i].clone().addScaledVector(right, side * (widths[i] / 2 - 0.18));
      curbPosition.y = 0.16;
      markerMatrix.compose(curbPosition, markerQuaternion, markerScale);
      const useRed = (i / 4 + (side > 0 ? 1 : 0)) % 2 === 0;
      if (useRed) redCurbs.setMatrixAt(redIndex++, markerMatrix);
      else whiteCurbs.setMatrixAt(whiteIndex++, markerMatrix);
    }
  }
  redCurbs.castShadow = true;
  whiteCurbs.castShadow = true;
  redCurbs.receiveShadow = true;
  whiteCurbs.receiveShadow = true;
  scene.add(redCurbs, whiteCurbs);

  // A restrained dashed guide exposes the route without dictating a racing line.
  const dashStep = 12;
  const dashCount = Math.ceil(sampleCount / dashStep);
  const dashes = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.12, 0.018, 2.15),
    new THREE.MeshBasicMaterial({ color: 0xe9dfac }),
    dashCount,
  );
  for (let i = 0, instance = 0; i < sampleCount; i += dashStep, instance++) {
    const tangent = tangents[i];
    markerQuaternion.setFromAxisAngle(UP, Math.atan2(tangent.x, tangent.z));
    const dashPosition = points[i].clone();
    dashPosition.y = 0.17;
    markerMatrix.compose(dashPosition, markerQuaternion, markerScale);
    dashes.setMatrixAt(instance, markerMatrix);
  }
  scene.add(dashes);

  const startLine = new THREE.Mesh(
    new THREE.BoxGeometry(widths[0] - 1.2, 0.025, 0.7),
    new THREE.MeshBasicMaterial({ color: 0xf4ead8 }),
  );
  startLine.position.copy(points[0]);
  startLine.position.y = 0.18;
  startLine.rotation.y = Math.atan2(tangents[0].x, tangents[0].z);
  scene.add(startLine);

  return { points, tangents, widths };
}

function addTaxiwayMarkings(
  scene: THREE.Object3D,
  road: GameMapDefinition["roads"][number],
  material: THREE.Material,
) {
  const rotation = road.rotation ?? 0;
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  const edgeOffset = road.depth / 2 - 0.7;
  for (let localX = -road.width / 2 + 7; localX <= road.width / 2 - 7; localX += 14) {
    for (const localZ of [-edgeOffset, edgeOffset]) {
      const mark = new THREE.Mesh(new THREE.PlaneGeometry(6, 0.16), material);
      mark.rotation.set(-Math.PI / 2, 0, rotation);
      mark.position.set(
        road.x + cos * localX + sin * localZ,
        0.14,
        road.z - sin * localX + cos * localZ,
      );
      scene.add(mark);
    }
  }
}

function addRoadMark(scene: THREE.Object3D, x: number, z: number, w: number, d: number, material: THREE.Material) {
  const mark = new THREE.Mesh(new THREE.PlaneGeometry(w, d), material);
  mark.rotation.x = -Math.PI / 2;
  mark.position.set(x, 0.115, z);
  scene.add(mark);
}

