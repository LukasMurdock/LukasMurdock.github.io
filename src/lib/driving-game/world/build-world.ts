import * as THREE from "three";
import type { GameMapDefinition } from "../maps";
import type { CircuitPhrase } from "../maps/types";
import { addBuilding } from "./buildings";
import { addBarrier, addStreetlight, addTree } from "./props";
import type { Obstacle } from "./types";

export type { Obstacle } from "./types";

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

export function buildWorld(scene: THREE.Scene, obstacles: Obstacle[], map: GameMapDefinition) {
  const grassMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 1,
    vertexColors: true,
    flatShading: true,
  });
  const ground = new THREE.Mesh(createFacetedGround(map.groundSize, map.environment.grass), grassMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const roadMaterial = new THREE.MeshStandardMaterial({
    color: map.environment.road,
    roughness: 1,
    flatShading: true,
  });
  const roadSegments = map.roads;
  const course = map.circuit ? buildDriftCircuit(scene, roadMaterial, map.circuit) : null;

  const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xe4bd42 });
  roadSegments.forEach((road) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(road.width, 0.12, road.depth), roadMaterial);
    mesh.position.set(road.x, 0.04, road.z);
    mesh.receiveShadow = true;
    scene.add(mesh);
    if (!road.markings) return;
    if (road.width >= road.depth) {
      for (let x = road.x - road.width / 2 + 5; x <= road.x + road.width / 2 - 5; x += 7) {
        addRoadMark(scene, x, road.z - 0.22, 3.3, 0.1, lineMaterial);
        addRoadMark(scene, x, road.z + 0.22, 3.3, 0.1, lineMaterial);
      }
    } else {
      for (let z = road.z - road.depth / 2 + 5; z <= road.z + road.depth / 2 - 5; z += 7) {
        addRoadMark(scene, road.x - 0.22, z, 0.1, 3.3, lineMaterial);
        addRoadMark(scene, road.x + 0.22, z, 0.1, 3.3, lineMaterial);
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
    scene.add(curb);
    const lot = new THREE.Mesh(new THREE.BoxGeometry(parkingLot.width, 0.04, parkingLot.depth), roadMaterial);
    lot.position.set(parkingLot.x, 0.09, parkingLot.z);
    lot.receiveShadow = true;
    scene.add(lot);
    for (let offset = -parkingLot.width / 2 + 2.3; offset < parkingLot.width / 2 - 1; offset += 3.1) {
      addRoadMark(
        scene,
        parkingLot.x + offset,
        parkingLot.z - parkingLot.depth / 2 + 2.1,
        0.09,
        3.6,
        parkingLineMaterial,
      );
      addRoadMark(
        scene,
        parkingLot.x + offset,
        parkingLot.z + parkingLot.depth / 2 - 2.1,
        0.09,
        3.6,
        parkingLineMaterial,
      );
    }
  });

  map.buildings.forEach((building) => addBuilding(
    scene,
    obstacles,
    building.x,
    building.z,
    building.width,
    building.depth,
    building.height,
    building.color,
  ));
  map.trees.forEach(({ x, z }) => addTree(scene, obstacles, x, z));
  map.streetlights.forEach(({ x, z }) => addStreetlight(scene, obstacles, x, z));
  map.barriers.forEach(({ x, z }) => addBarrier(scene, obstacles, x, z));

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
      const onCityRoad = roadSegments.some((road) =>
        Math.abs(position.x - road.x) <= road.width / 2
        && Math.abs(position.z - road.z) <= road.depth / 2
      );
      const onParkingLot = map.parkingLots.some((parkingLot) =>
        Math.abs(position.x - parkingLot.x) <= parkingLot.width / 2
        && Math.abs(position.z - parkingLot.z) <= parkingLot.depth / 2
      );
      if (onCityRoad || onParkingLot) return true;

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
  };
}

function buildDriftCircuit(
  scene: THREE.Scene,
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

function addRoadMark(scene: THREE.Scene, x: number, z: number, w: number, d: number, material: THREE.Material) {
  const mark = new THREE.Mesh(new THREE.PlaneGeometry(w, d), material);
  mark.rotation.x = -Math.PI / 2;
  mark.position.set(x, 0.115, z);
  scene.add(mark);
}

