"use client";

import { useSimulator } from "@/hooks/use-simulator";
import { HeroTitle } from "@/components/hero-title";
import { ParametersPanel } from "@/components/parameters-panel";
import { ResultCard } from "@/components/result-card";
import { DebitCreditCard } from "@/components/breakdown/debit-credit-card";
import { IibbCard } from "@/components/breakdown/iibb-card";
import { ProportionalBreakdown } from "@/components/breakdown/proportional-breakdown";
import { BenefitDonut } from "@/components/charts/donut-chart";
import { ComparisonBarChart } from "@/components/charts/comparison-bar-chart";

export function Simulator() {
  const {
    monthlyVolume,
    activity,
    horizon,
    province,
    setMonthlyVolume,
    setActivity,
    setHorizon,
    setProvince,
    result,
  } = useSimulator();

  return (
    <div className="space-y-6 sm:space-y-7">
      {/* ─── ROW 1: Title + Donut (2-col en lg+) ─── */}
      <section className="grid items-center gap-6 sm:gap-7 lg:grid-cols-2 lg:gap-10">
        <HeroTitle />
        <BenefitDonut result={result} />
      </section>

      {/* ─── ROW 2: Parameters (full) ─── */}
      <ParametersPanel
        monthlyVolume={monthlyVolume}
        activity={activity}
        horizon={horizon}
        province={province}
        onVolumeChange={setMonthlyVolume}
        onActivityChange={setActivity}
        onHorizonChange={setHorizon}
        onProvinceChange={setProvince}
      />

      {/* ─── ROW 3: Result card (full) ─── */}
      <ResultCard result={result} />

      {/* ─── ROW 4: Breakdowns (2-col en lg+) ─── */}
      <section className="grid gap-6 sm:gap-7 lg:grid-cols-2">
        <DebitCreditCard result={result} />
        <IibbCard result={result} province={province} activity={activity} />
      </section>

      {/* ─── ROW 5: Proportional breakdown ─── */}
      <ProportionalBreakdown result={result} province={province} />

      {/* ─── ROW 6: Bank vs ALyC comparison ─── */}
      <ComparisonBarChart result={result} />
    </div>
  );
}
