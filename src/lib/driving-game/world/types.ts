import type * as THREE from "three";

export type ObstacleKind = "building" | "tree" | "streetlight" | "barrier";

export type Obstacle = {
  kind: ObstacleKind;
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  orientedBox?: {
    x: number;
    z: number;
    halfWidth: number;
    halfDepth: number;
    rotation: number;
  };
  resetsCar?: boolean;
};

export type WorldCollision = {
  kind: ObstacleKind;
  normalX: number;
  normalZ: number;
  penetration: number;
  resetsCar: boolean;
};

export type WorldDiagnostics = {
  buildMilliseconds: number;
  obstacles: number;
  pavementPrimitives: number;
  collisionQueries: number;
  collisionCandidates: number;
  pavementQueries: number;
  pavementCandidates: number;
};

export type WorldRuntime = {
  spawnPosition: THREE.Vector3;
  spawnHeading: number;
  isOnPavement: (position: THREE.Vector3) => boolean;
  queryCollision: (position: THREE.Vector3, radius: number) => WorldCollision | null;
  isOutsideBoundary: (position: THREE.Vector3, radius: number) => boolean;
  getDiagnostics: () => Readonly<WorldDiagnostics>;
  destroy: () => void;
};
