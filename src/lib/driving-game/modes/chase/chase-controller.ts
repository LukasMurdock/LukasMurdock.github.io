import type { DriveEndReason } from "../../types";
import type { GameModeContext, GameModeController } from "../types";
import { createChaseHud } from "./chase-hud";
import { createPursuer } from "./pursuer";
import { CHASE_TUNING } from "./tuning";
import type { ChaseState } from "./types";

export function createChaseController(context: GameModeContext): GameModeController {
  const hud = createChaseHud(context.hudRoot);
  const pursuers = [createPursuer(context.scene, context.world)];
  let state: ChaseState = "waiting";
  let started = false;
  let stateTime = 0;
  let captureGrace = 0;
  let reinforcementNotice = 0;
  let activePursuerCount = 0;
  let capturedSurvivalTime = 0;

  function setPursuersVisible(count: number) {
    pursuers.forEach((pursuer, index) => pursuer.setVisible(index < count));
  }

  function enterActive() {
    state = "active";
    stateTime = 0;
    captureGrace = CHASE_TUNING.captureGraceDuration;
    reinforcementNotice = 0;
    activePursuerCount = 1;
    const player = context.getPlayer();
    pursuers.forEach((pursuer, index) => pursuer.resetBehind(player, index));
    setPursuersVisible(activePursuerCount);
    hud.showActive({
      survivalTime: context.getDriveTime(),
      nearestDistance: 17,
      reinforcements: false,
    });
  }

  function enterCaptured() {
    state = "captured";
    stateTime = 0;
    setPursuersVisible(0);
    hud.showCaptured(capturedSurvivalTime);
  }

  function reset(reason: DriveEndReason) {
    if (!started) {
      state = "waiting";
      setPursuersVisible(0);
      hud.showWaiting();
      return;
    }
    if (reason === "mode") enterCaptured();
    else enterActive();
  }

  setPursuersVisible(0);
  hud.showWaiting();

  return {
    start() {
      started = true;
      capturedSurvivalTime = 0;
      enterActive();
    },
    update(dt) {
      stateTime += dt;
      if (state === "waiting") return;
      if (state === "captured") {
        if (stateTime >= CHASE_TUNING.capturePresentationDuration) enterActive();
        return;
      }

      captureGrace = Math.max(0, captureGrace - dt);
      reinforcementNotice = Math.max(0, reinforcementNotice - dt);
      const survivalTime = context.getDriveTime();
      const requestedPursuers = pursuerCountAt(survivalTime);
      if (requestedPursuers > activePursuerCount) {
        const player = context.getPlayer();
        for (let index = activePursuerCount; index < requestedPursuers; index++) {
          const pursuer = pursuers[index]
            ?? createPursuer(context.scene, context.world);
          if (!pursuers[index]) pursuers.push(pursuer);
          pursuer.resetBehind(player, index);
          pursuer.setVisible(true);
        }
        activePursuerCount = requestedPursuers;
        captureGrace = Math.max(captureGrace, CHASE_TUNING.reinforcementCaptureGraceDuration);
        reinforcementNotice = 1.8;
      }

      let nearestDistance = Number.POSITIVE_INFINITY;
      let hasVehicleContact = false;
      for (let index = 0; index < activePursuerCount; index++) {
        const update = pursuers[index].update(dt, context.getPlayer());
        let resolvedDistance = update.distanceToPlayer;
        if (update.playerCollision) {
          hasVehicleContact = true;
          context.applyPlayerCollision(update.playerCollision);
          resolvedDistance += update.playerCollision.penetration;
        }
        nearestDistance = Math.min(nearestDistance, resolvedDistance);
      }
      hud.showActive({
        survivalTime,
        nearestDistance,
        reinforcements: reinforcementNotice > 0,
      });

      if (captureGrace === 0 && hasVehicleContact) {
        capturedSurvivalTime = survivalTime;
        enterCaptured();
        context.endDrive();
      }
    },
    isDriveClockRunning: () => state === "active",
    pause() {},
    reset,
    onPlayerEvent() {},
    destroy() {
      state = "waiting";
      hud.destroy();
      pursuers.forEach((pursuer) => pursuer.destroy());
    },
  };
}

function pursuerCountAt(survivalTime: number) {
  return Math.min(
    CHASE_TUNING.maximumPursuers,
    CHASE_TUNING.escalationTimes.filter((threshold) => survivalTime >= threshold).length,
  );
}
