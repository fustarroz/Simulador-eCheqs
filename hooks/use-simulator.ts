"use client";

import { useMemo, useState } from "react";
import { simulate } from "@/lib/calculations";
import { VOLUME_DEFAULT } from "@/lib/constants";
import type { Activity, Horizon, Province, SimulatorInput } from "@/lib/types";

/**
 * Hook centralizado del simulador. Encapsula el estado y memoiza la salida
 * del motor financiero para evitar recálculos en cada render.
 */
export function useSimulator(initial?: Partial<SimulatorInput>) {
  const [monthlyVolume, setMonthlyVolume] = useState<number>(
    initial?.monthlyVolume ?? VOLUME_DEFAULT,
  );
  const [activity, setActivity] = useState<Activity>(
    initial?.activity ?? "Comercio",
  );
  const [horizon, setHorizon] = useState<Horizon>(
    initial?.horizon ?? "Año completo",
  );
  const [province, setProvince] = useState<Province>(
    initial?.province ?? "CABA",
  );

  const result = useMemo(
    () => simulate({ monthlyVolume, activity, horizon, province }),
    [monthlyVolume, activity, horizon, province],
  );

  return {
    // Inputs
    monthlyVolume,
    activity,
    horizon,
    province,
    // Setters
    setMonthlyVolume,
    setActivity,
    setHorizon,
    setProvince,
    // Output
    result,
  };
}
