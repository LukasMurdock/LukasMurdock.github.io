import type * as THREE from "three";

export type ObstacleKind = "building" | "tree" | "streetlight" | "barrier";

export type Obstacle = {
  kind: ObstacleKind;
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  resetsCar?: boolean;
};

export type WorldCollision = {
  kind: ObstacleKind;
  normalX: number;
  normalZ: number;
  penetration: number;
  resetsCar: boolean;
};

export type WorldRuntime = {
  spawnPosition: THREE.Vector3;
  spawnHeading: number;
  isOnPavement: (position: THREE.Vector3) => boolean;
  queryCollision: (position: THREE.Vector3, radius: number) => WorldCollision | null;
  isOutsideBoundary: (position: THREE.Vector3, radius: number) => boolean;
};
