import * as THREE from "three";
import type { GameModeContext, GameModeController } from "../types";
import { createPursuer } from "./pursuer";

export function createChaseController(context: GameModeContext): GameModeController {
  const pursuer = createPursuer(context.scene, context.world);
  const hud = document.createElement("div");
  hud.className = "chase-status";
  hud.hidden = true;
  const label = document.createElement("span");
  label.className = "chase-status__label";
  label.textContent = "Pursuit";
  const message = document.createElement("strong");
  message.className = "chase-status__message";
  const meter = document.createElement("span");
  meter.className = "chase-status__meter";
  meter.setAttribute("aria-hidden", "true");
  const meterFill = document.createElement("span");
  meter.append(meterFill);
  hud.append(label, message, meter);
  context.hudRoot.append(hud);

  let active = false;
  let captureGrace = 0;
  let currentMessage = "";

  function updateHud(distance: number) {
    const pressure = 1 - THREE.MathUtils.smoothstep(distance, 7, 45);
    meterFill.style.transform = `scaleX(${pressure.toFixed(3)})`;
    const nextMessage = distance < 8
      ? "Right behind you"
      : distance < 18
        ? "Closing in"
        : distance < 36
          ? "Keep moving"
          : "Pulling away";
    if (nextMessage !== currentMessage) {
      currentMessage = nextMessage;
      message.textContent = nextMessage;
      hud.dataset.pressure = distance < 8 ? "danger" : distance < 18 ? "close" : "open";
    }
  }

  function resetPursuit() {
    pursuer.resetBehind(context.getPlayer());
    pursuer.setVisible(active);
    captureGrace = 1.8;
    updateHud(17);
  }

  pursuer.setVisible(false);
  resetPursuit();

  return {
    start() {
      active = true;
      hud.hidden = false;
      resetPursuit();
    },
    update(dt) {
      if (!active) return;
      captureGrace = Math.max(0, captureGrace - dt);
      const distance = pursuer.update(dt, context.getPlayer());
      updateHud(distance);
      if (captureGrace === 0 && distance <= pursuer.getCaptureDistance()) context.endDrive();
    },
    pause() {},
    reset() {
      resetPursuit();
    },
    onPlayerEvent() {},
    destroy() {
      active = false;
      hud.remove();
      pursuer.destroy();
    },
  };
}
