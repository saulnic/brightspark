"use client";

import { useEffect } from "react";

function tone(
  frequency: number,
  duration: number,
  gainValue = 0.02,
  delay = 0,
  attack = 0.012
) {
  const AudioContextCtor =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextCtor) return;

  const ctx = new AudioContextCtor();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  const start = ctx.currentTime + delay;
  const end = start + duration;

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.linearRampToValueAtTime(gainValue, start + attack);
  gain.gain.setValueAtTime(gainValue, Math.max(start + attack, end - 0.055));
  gain.gain.exponentialRampToValueAtTime(0.0001, end);

  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(end);

  window.setTimeout(() => void ctx.close(), Math.ceil((delay + duration + 0.08) * 1000));
}

export function AudioFeedback() {
  useEffect(() => {
    function press(event: PointerEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("button, a")) {
        tone(430, 0.12, 0.012, 0, 0.018);
      }
    }

    function feedback(event: Event) {
      const detail = (event as CustomEvent<{ type?: string }>).detail?.type;
      if (detail === "correct") {
        tone(620, 0.16, 0.025);
        tone(820, 0.18, 0.022, 0.11);
      } else if (detail === "incorrect") {
        tone(280, 0.19, 0.02);
        tone(225, 0.21, 0.018, 0.12);
      } else if (detail === "complete") {
        tone(523, 0.14, 0.022);
        tone(659, 0.14, 0.022, 0.11);
        tone(784, 0.2, 0.024, 0.22);
      }
    }

    document.addEventListener("pointerdown", press);
    window.addEventListener("brightspark:feedback", feedback);
    return () => {
      document.removeEventListener("pointerdown", press);
      window.removeEventListener("brightspark:feedback", feedback);
    };
  }, []);

  return null;
}
