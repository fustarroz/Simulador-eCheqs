"use client";

import * as React from "react";
import { useCountUp } from "@/hooks/use-count-up";

interface CountUpProps {
  value: number;
  format: (value: number) => string;
  duration?: number;
  className?: string;
  "aria-label"?: string;
}

/**
 * Wrapper presentacional sobre el hook useCountUp. Recibe un formateador
 * (formatCurrencyARS, formatARS, formatPercent…) para no acoplar el hook
 * a un formato específico.
 */
export function CountUp({
  value,
  format,
  duration,
  className,
  "aria-label": ariaLabel,
}: CountUpProps) {
  const animated = useCountUp(value, duration);
  return (
    <span
      className={className}
      aria-label={ariaLabel}
      // Tabular figures evitan el "salto" de ancho durante la animación
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {format(animated)}
    </span>
  );
}
