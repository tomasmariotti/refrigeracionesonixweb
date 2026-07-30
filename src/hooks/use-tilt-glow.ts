import { useEffect, useRef } from "react";

interface UseTiltGlowOptions {
  maxTiltDeg?: number;
}

export function useTiltGlow<T extends HTMLElement>({ maxTiltDeg = 6 }: UseTiltGlowOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reducedMotion || !finePointer) return;

    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const tiltX = (0.5 - py) * maxTiltDeg;
        const tiltY = (px - 0.5) * maxTiltDeg;
        el.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
        el.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
        el.style.setProperty("--tilt-lift", "-4px");
        el.style.setProperty("--glow-x", `${(px * 100).toFixed(1)}%`);
        el.style.setProperty("--glow-y", `${(py * 100).toFixed(1)}%`);
      });
    };

    const onPointerLeave = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
      el.style.setProperty("--tilt-lift", "0px");
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [maxTiltDeg]);

  return ref;
}
