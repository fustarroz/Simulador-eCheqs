"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Anima un valor numérico desde el valor anterior hasta el nuevo, usando
 * easing cuadrático. Optimizado con requestAnimationFrame: una sola
 * suscripción por instancia, sin re-render extra fuera de los frames.
 *
 * Si `prefersReducedMotion` está activo, devuelve el valor target directo.
 */
export function useCountUp(value: number, duration = 600) {
  const [display, setDisplay] = useState<number>(value);
  const previous = useRef<number>(value);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setDisplay(value);
      previous.current = value;
      return;
    }

    const start = performance.now();
    const from = previous.current;
    const to = value;

    if (from === to) return;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // easeOutQuart — finaliza con sensación de "asentarse"
      const eased = 1 - Math.pow(1 - t, 4);
      const next = from + (to - from) * eased;
      setDisplay(next);
      if (t < 1) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        previous.current = to;
      }
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [value, duration]);

  return display;
}
