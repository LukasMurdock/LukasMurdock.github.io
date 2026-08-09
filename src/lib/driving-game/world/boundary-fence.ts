import * as THREE from "three";

const FENCE_HEIGHT = 1.65;
const POST_SPACING = 7.5;

export function addBoundaryFence(scene: THREE.Object3D, limit: number) {
  const material = new THREE.MeshStandardMaterial({
    color: 0x4a4a40,
    roughness: 1,
    flatShading: true,
  });
  const postGeometry = new THREE.BoxGeometry(0.22, FENCE_HEIGHT, 0.22);
  const postsPerSide = Math.ceil(limit * 2 / POST_SPACING) + 1;
  const posts = new THREE.InstancedMesh(postGeometry, material, postsPerSide * 4);
  const matrix = new THREE.Matrix4();
  let instance = 0;

  for (let index = 0; index < postsPerSide; index++) {
    const offset = THREE.MathUtils.lerp(-limit, limit, index / (postsPerSide - 1));
    for (const [x, z] of [
      [offset, -limit],
      [offset, limit],
      [-limit, offset],
      [limit, offset],
    ]) {
      matrix.makeTranslation(x, FENCE_HEIGHT / 2, z);
      posts.setMatrixAt(instance++, matrix);
    }
  }
  posts.instanceMatrix.needsUpdate = true;
  scene.add(posts);

  const railGeometryX = new THREE.BoxGeometry(limit * 2, 0.12, 0.12);
  const railGeometryZ = new THREE.BoxGeometry(0.12, 0.12, limit * 2);
  for (const height of [0.62, 1.28]) {
    for (const z of [-limit, limit]) {
      const rail = new THREE.Mesh(railGeometryX, material);
      rail.position.set(0, height, z);
      scene.add(rail);
    }
    for (const x of [-limit, limit]) {
      const rail = new THREE.Mesh(railGeometryZ, material);
      rail.position.set(x, height, 0);
      scene.add(rail);
    }
  }
}
