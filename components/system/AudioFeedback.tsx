"use client";

import { useEffect } from "react";

function tone(frequency: number, duration: number, gainValue = 0.035, delay = 0) {
  const AudioContextCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextCtor) return;

  const ctx = new AudioContextCtor();
  const start = ctx.currentTime + delay;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(gainValue, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(start + duration);
  oscillator.addEventListener("ended", () => void ctx.close());
}

export function AudioFeedback() {
  useEffect(() => {
    function press(event: PointerEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("button, a")) tone(360, 0.045, 0.018);
    }

    function feedback(event: Event) {
      const detail = (event as CustomEvent<{ type?: string }>).detail?.type;
      if (detail === "correct") {
        tone(660, 0.11, 0.04);
        tone(880, 0.14, 0.035, 0.09);
      } else if (detail === "incorrect") {
        tone(260, 0.16, 0.035);
        tone(210, 0.18, 0.03, 0.1);
      } else if (detail === "complete") {
        tone(523, 0.1, 0.035);
        tone(659, 0.1, 0.035, 0.09);
        tone(784, 0.16, 0.035, 0.18);
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
