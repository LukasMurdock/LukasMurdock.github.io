import * as THREE from "three";
import type { PlayerSnapshot } from "../../player";
import { createCar } from "../../vehicle/create-car";
import type { WorldRuntime } from "../../world/types";

const PURSUER_RADIUS = 1.25;
const CAPTURE_DISTANCE = 3.15;
const MAXIMUM_SPEED = 30;
const OFF_ROAD_MAXIMUM_SPEED = 18;

export type Pursuer = {
  setVisible: (visible: boolean) => void;
  resetBehind: (player: PlayerSnapshot) => void;
  update: (dt: number, player: PlayerSnapshot) => number;
  getCaptureDistance: () => number;
  destroy: () => void;
};

export function createPursuer(scene: THREE.Scene, world: WorldRuntime): Pursuer {
  const car = createCar({ police: true });
  scene.add(car.group);

  const position = world.spawnPosition.clone();
  const target = new THREE.Vector3();
  const forward = new THREE.Vector3();
  const candidate = new THREE.Vector3();
  let heading = world.spawnHeading;
  let speed = 0;
  let steeringVisual = 0;
  let sirenTime = 0;
  let avoidanceTime = 0;
  let avoidanceHeading = heading;

  function placeCar() {
    car.group.position.copy(position);
    car.group.rotation.y = heading;
  }

  function resetBehind(player: PlayerSnapshot) {
    const sin = Math.sin(player.heading);
    const cos = Math.cos(player.heading);
    const candidates = [
      { behind: 17, side: 0 },
      { behind: 22, side: 5 },
      { behind: 22, side: -5 },
      { behind: 28, side: 0 },
    ];
    let placed = false;
    for (const offset of candidates) {
      candidate.set(
        player.position.x - sin * offset.behind + cos * offset.side,
        0.06,
        player.position.z - cos * offset.behind - sin * offset.side,
      );
      if (world.isOutsideBoundary(candidate, PURSUER_RADIUS)) continue;
      if (world.queryCollision(candidate, PURSUER_RADIUS)) continue;
      position.copy(candidate);
      placed = true;
      break;
    }
    if (!placed) position.copy(world.spawnPosition);

    heading = player.heading;
    speed = Math.min(player.speed * 0.55, 12);
    steeringVisual = 0;
    avoidanceTime = 0;
    avoidanceHeading = heading;
    placeCar();
  }

  function update(dt: number, player: PlayerSnapshot) {
    target.copy(player.position).addScaledVector(player.velocity, 0.38);
    const targetHeading = Math.atan2(target.x - position.x, target.z - position.z);
    avoidanceTime = Math.max(0, avoidanceTime - dt);
    const requestedHeading = avoidanceTime > 0 ? avoidanceHeading : targetHeading;
    const headingError = angleDifference(heading, requestedHeading);
    const turnRate = THREE.MathUtils.lerp(1.35, 2.15, THREE.MathUtils.clamp(speed / 22, 0, 1));
    const headingStep = THREE.MathUtils.clamp(headingError, -turnRate * dt, turnRate * dt);
    heading = normalizeAngle(heading + headingStep);

    const onPavement = world.isOnPavement(position);
    const maximumSpeed = onPavement ? MAXIMUM_SPEED : OFF_ROAD_MAXIMUM_SPEED;
    const distanceToPlayer = horizontalDistance(position, player.position);
    const catchUp = THREE.MathUtils.clamp((distanceToPlayer - 9) / 26, 0, 1) * 2.5;
    const targetSpeed = Math.min(maximumSpeed, Math.max(19, player.speed + catchUp));
    const speedChange = targetSpeed > speed ? 9.5 * dt : 13 * dt;
    speed += THREE.MathUtils.clamp(targetSpeed - speed, -speedChange, speedChange);

    forward.set(Math.sin(heading), 0, Math.cos(heading));
    const distance = speed * dt;
    const steps = Math.max(1, Math.ceil(distance / 0.65));
    for (let step = 0; step < steps; step++) {
      position.addScaledVector(forward, distance / steps);
      const collision = world.queryCollision(position, PURSUER_RADIUS);
      if (!collision) continue;

      position.x += collision.normalX * collision.penetration;
      position.z += collision.normalZ * collision.penetration;
      const tangentA = Math.atan2(collision.normalZ, -collision.normalX);
      const tangentB = normalizeAngle(tangentA + Math.PI);
      avoidanceHeading = Math.abs(angleDifference(tangentA, targetHeading))
          < Math.abs(angleDifference(tangentB, targetHeading))
        ? tangentA
        : tangentB;
      avoidanceTime = 0.72;
      heading = normalizeAngle(heading + THREE.MathUtils.clamp(
        angleDifference(heading, avoidanceHeading),
        -0.42,
        0.42,
      ));
      forward.set(Math.sin(heading), 0, Math.cos(heading));
      speed *= 0.48;
    }

    if (world.isOutsideBoundary(position, PURSUER_RADIUS)) resetBehind(player);

    steeringVisual = THREE.MathUtils.lerp(
      steeringVisual,
      THREE.MathUtils.clamp(headingError * 0.7, -0.5, 0.5),
      1 - Math.exp(-10 * dt),
    );
    car.frontWheels.forEach((wheel) => (wheel.rotation.y = steeringVisual));
    car.wheels.forEach((wheel) => (wheel.rotation.x += speed * dt / 0.42));
    car.brakeLights.forEach((light) => {
      const material = light.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = targetSpeed < speed ? 4.5 : 1.2;
    });

    sirenTime += dt;
    car.emergencyLights.forEach((light, index) => {
      const material = light.material as THREE.MeshStandardMaterial;
      const pulse = Math.sin(sirenTime * 16 + index * Math.PI) > 0;
      material.emissiveIntensity = pulse ? 7 : 0.65;
    });
    placeCar();
    return horizontalDistance(position, player.position);
  }

  return {
    setVisible(visible) {
      car.group.visible = visible;
    },
    resetBehind,
    update,
    getCaptureDistance: () => CAPTURE_DISTANCE,
    destroy() {
      scene.remove(car.group);
      car.group.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      });
    },
  };
}

function horizontalDistance(a: THREE.Vector3, b: THREE.Vector3) {
  return Math.hypot(a.x - b.x, a.z - b.z);
}

function normalizeAngle(angle: number) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

function angleDifference(from: number, to: number) {
  return normalizeAngle(to - from);
}
