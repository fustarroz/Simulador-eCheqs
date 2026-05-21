"use client";

import { useMemo, useState } from "react";
import { simulate } from "@/lib/calculations";
import { VOLUME_DEFAULT } from "@/lib/constants";
import type { Activity, Horizon, Province, SimulatorInput } from "@/lib/types";

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

  // Flags para incluir/excluir componentes del beneficio
  const [includeDebito, setIncludeDebito] = useState<boolean>(true);
  const [includeCredito, setIncludeCredito] = useState<boolean>(true);
  const [includeIibb, setIncludeIibb] = useState<boolean>(true);

  const result = useMemo(
    () =>
      simulate({
        monthlyVolume,
        activity,
        horizon,
        province,
        includeDebito,
        includeCredito,
        includeIibb,
      }),
    [
      monthlyVolume,
      activity,
      horizon,
      province,
      includeDebito,
      includeCredito,
      includeIibb,
    ],
  );

  return {
    // Inputs
    monthlyVolume,
    activity,
    horizon,
    province,
    includeDebito,
    includeCredito,
    includeIibb,
    // Setters
    setMonthlyVolume,
    setActivity,
    setHorizon,
    setProvince,
    setIncludeDebito,
    setIncludeCredito,
    setIncludeIibb,
    // Output
    result,
  };
}
