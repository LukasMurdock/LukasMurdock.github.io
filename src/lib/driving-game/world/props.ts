import * as THREE from "three";
import type { Obstacle } from "./types";

export function addTree(scene: THREE.Object3D, obstacles: Obstacle[], x: number, z: number) {
  const group = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.34, 0.48, 2.5, 5),
    new THREE.MeshStandardMaterial({ color: 0x65503a, roughness: 1, flatShading: true }),
  );
  trunk.position.y = 1.25;
  trunk.castShadow = true;
  group.add(trunk);

  const foliageColors = [0x344d20, 0x486421, 0x5f7625];
  const layers = [
    { radius: 2.35, height: 3.5, y: 2.75 },
    { radius: 1.85, height: 3.25, y: 4.15 },
    { radius: 1.3, height: 2.8, y: 5.45 },
  ];
  layers.forEach((layer, index) => {
    const foliage = new THREE.Mesh(
      new THREE.ConeGeometry(layer.radius, layer.height, 5),
      new THREE.MeshStandardMaterial({
        color: foliageColors[index],
        roughness: 1,
        flatShading: true,
      }),
    );
    foliage.position.y = layer.y;
    foliage.rotation.y = index * 0.37;
    foliage.castShadow = true;
    group.add(foliage);
  });

  group.position.set(x, 0, z);
  scene.add(group);
  obstacles.push({
    kind: "tree",
    minX: x - 0.8,
    maxX: x + 0.8,
    minZ: z - 0.8,
    maxZ: z + 0.8,
    resetsCar: true,
  });
}

export function addStreetlight(scene: THREE.Object3D, obstacles: Obstacle[], x: number, z: number) {
  const group = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({ color: 0x343832, roughness: 1, flatShading: true });
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.28, 0.7), metal);
  base.position.y = 0.14;
  group.add(base);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.16, 5.2, 5), metal);
  pole.position.y = 2.7;
  group.add(pole);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.16, 0.16), metal);
  arm.position.set(0.58, 5.23, 0);
  group.add(arm);
  const lamp = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 0.18, 0.42),
    new THREE.MeshBasicMaterial({ color: 0xf2d77f }),
  );
  lamp.position.set(1.16, 5.1, 0);
  group.add(lamp);
  group.position.set(x, 0, z);
  group.rotation.y = ((Math.abs(x * 7 + z * 11) % 4) * Math.PI) / 2;
  group.traverse((object) => {
    if (object instanceof THREE.Mesh) object.castShadow = true;
  });
  scene.add(group);
  obstacles.push({
    kind: "streetlight",
    minX: x - 0.32,
    maxX: x + 0.32,
    minZ: z - 0.32,
    maxZ: z + 0.32,
    resetsCar: true,
  });
}

export function addBarrier(scene: THREE.Object3D, obstacles: Obstacle[], x: number, z: number) {
  const barrier = new THREE.Mesh(
    new THREE.BoxGeometry(2.8, 0.75, 0.7),
    new THREE.MeshStandardMaterial({ color: 0xf1e8c9, roughness: 1, flatShading: true }),
  );
  barrier.position.set(x, 0.42, z);
  barrier.castShadow = true;
  scene.add(barrier);
  for (const offset of [-0.72, 0.72]) {
    const stripe = new THREE.Mesh(
      new THREE.PlaneGeometry(0.62, 0.76),
      new THREE.MeshBasicMaterial({ color: 0xd85739 }),
    );
    stripe.position.set(x + offset, 0.42, z + 0.351);
    stripe.rotation.z = -0.42;
    scene.add(stripe);
  }
  obstacles.push({
    kind: "barrier",
    minX: x - 1.4,
    maxX: x + 1.4,
    minZ: z - 0.35,
    maxZ: z + 0.35,
    resetsCar: true,
  });
}

