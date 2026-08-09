import * as THREE from "three";
import type { Obstacle } from "./types";

const UP = new THREE.Vector3(0, 1, 0);

export function addBuilding(
  scene: THREE.Scene,
  obstacles: Obstacle[],
  x: number,
  z: number,
  width: number,
  depth: number,
  height: number,
  color: number,
) {
  const group = new THREE.Group();
  const concreteMaterial = new THREE.MeshStandardMaterial({ color: 0xaaa58a, roughness: 1, flatShading: true });
  const foundation = new THREE.Mesh(
    new THREE.BoxGeometry(width + 1.7, 0.16, depth + 1.7),
    concreteMaterial,
  );
  foundation.position.y = 0.08;
  foundation.receiveShadow = true;
  group.add(foundation);

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    new THREE.MeshStandardMaterial({ color, roughness: 1, flatShading: true }),
  );
  body.position.y = height / 2 + 0.16;
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  const baseBand = new THREE.Mesh(
    new THREE.BoxGeometry(width + 0.06, 0.48, depth + 0.06),
    new THREE.MeshStandardMaterial({ color: 0x655f50, roughness: 1, flatShading: true }),
  );
  baseBand.position.y = 0.4;
  baseBand.castShadow = true;
  group.add(baseBand);

  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(width + 0.75, 0.48, depth + 0.75),
    new THREE.MeshStandardMaterial({ color: 0x424139, roughness: 1, flatShading: true }),
  );
  roof.position.y = height + 0.4;
  roof.castShadow = true;
  group.add(roof);

  if (height >= 13) {
    const roofUnit = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 0.85, 2),
      new THREE.MeshStandardMaterial({ color: 0x777363, roughness: 1, flatShading: true }),
    );
    roofUnit.position.set(width * 0.18, height + 1.05, -depth * 0.16);
    roofUnit.castShadow = true;
    group.add(roofUnit);
  }

  const windowMaterial = new THREE.MeshBasicMaterial({ color: 0x26383a });
  const windows: Array<[number, number, number, number]> = [];
  for (let y = 2.3; y < height - 0.7; y += 3.05) {
    for (let offset = -width / 2 + 1.8; offset < width / 2 - 0.45; offset += 3) {
      windows.push([offset, y + 0.16, depth / 2 + 0.011, 0]);
      windows.push([-offset, y + 0.16, -depth / 2 - 0.011, Math.PI]);
    }
    for (let offset = -depth / 2 + 1.8; offset < depth / 2 - 0.45; offset += 3) {
      windows.push([width / 2 + 0.011, y + 0.16, -offset, Math.PI / 2]);
      windows.push([-width / 2 - 0.011, y + 0.16, offset, -Math.PI / 2]);
    }
  }
  const windowInstances = new THREE.InstancedMesh(
    new THREE.PlaneGeometry(1.45, 1.35),
    windowMaterial,
    windows.length,
  );
  const windowMatrix = new THREE.Matrix4();
  const windowQuaternion = new THREE.Quaternion();
  windows.forEach(([px, py, pz, rotationY], index) => {
    windowQuaternion.setFromAxisAngle(UP, rotationY);
    windowMatrix.compose(
      new THREE.Vector3(px, py, pz),
      windowQuaternion,
      new THREE.Vector3(1, 1, 1),
    );
    windowInstances.setMatrixAt(index, windowMatrix);
  });
  group.add(windowInstances);

  const door = new THREE.Mesh(new THREE.PlaneGeometry(1.55, 2.2), windowMaterial);
  door.position.set(0, 1.42, depth / 2 + 0.014);
  group.add(door);

  if ((Math.abs(x + z) / 15) % 2 < 1) {
    const awningColors = [0xf3e7bd, 0xd65a3b];
    for (let stripe = 0; stripe < 4; stripe++) {
      const awning = new THREE.Mesh(
        new THREE.BoxGeometry(0.72, 0.12, 0.85),
        new THREE.MeshBasicMaterial({ color: awningColors[stripe % 2] }),
      );
      awning.position.set((stripe - 1.5) * 0.72, 2.55, depth / 2 + 0.38);
      awning.rotation.x = -0.18;
      group.add(awning);
    }
  }

  group.position.set(x, 0, z);
  scene.add(group);
  obstacles.push({
    kind: "building",
    minX: x - width / 2,
    maxX: x + width / 2,
    minZ: z - depth / 2,
    maxZ: z + depth / 2,
    resetsCar: true,
  });
}

