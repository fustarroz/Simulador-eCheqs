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
    includeDebito,
    includeCredito,
    includeIibb,
    setMonthlyVolume,
    setActivity,
    setHorizon,
    setProvince,
    setIncludeDebito,
    setIncludeCredito,
    setIncludeIibb,
    result,
  } = useSimulator();

  return (
    <div className="space-y-6 sm:space-y-7">
      <section className="grid items-center gap-6 sm:gap-7 lg:grid-cols-2 lg:gap-10">
        <HeroTitle />
        <BenefitDonut result={result} />
      </section>

      <ParametersPanel
        monthlyVolume={monthlyVolume}
        activity={activity}
        horizon={horizon}
        province={province}
        includeDebito={includeDebito}
        includeCredito={includeCredito}
        includeIibb={includeIibb}
        onVolumeChange={setMonthlyVolume}
        onActivityChange={setActivity}
        onHorizonChange={setHorizon}
        onProvinceChange={setProvince}
        onIncludeDebitoChange={setIncludeDebito}
        onIncludeCreditoChange={setIncludeCredito}
        onIncludeIibbChange={setIncludeIibb}
      />

      <ResultCard result={result} />

      <section className="grid gap-6 sm:gap-7 lg:grid-cols-2">
        <DebitCreditCard result={result} />
        <IibbCard result={result} province={province} activity={activity} />
      </section>

      <ProportionalBreakdown result={result} province={province} />

      <ComparisonBarChart result={result} />
    </div>
  );
}
