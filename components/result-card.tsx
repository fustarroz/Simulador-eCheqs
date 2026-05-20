"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/count-up";
import { formatCurrencyARS, formatPercentDot } from "@/lib/format";
import type { SimulatorResult } from "@/lib/types";

const easeInst = [0.32, 0.72, 0, 1] as const;

interface ResultCardProps {
  result: SimulatorResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const horizonLabel = `${result.months} meses`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.12, ease: easeInst }}
      aria-labelledby="result-title"
      className="relative overflow-hidden rounded-3xl bg-result-deep p-7 text-paper shadow-glow sm:p-9"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-sage-300/10 blur-3xl"
      />

      <div className="relative">
        <header className="flex items-center justify-between">
          <p
            id="result-title"
            className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sage-200/80"
          >
            Resultado · {horizonLabel}
          </p>
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-sage-200/60">
            02 / 03
          </span>
        </header>

        {/* Main KPI grid */}
        {/* Main KPI grid */}
        <div className="mt-7 grid gap-7 sm:grid-cols-2 sm:items-end sm:gap-0">
          <div className="sm:pr-8">
            <p className="text-[13px] font-medium text-sage-100/80">
              Beneficio financiero total
            </p>
            <CountUp
              value={result.totalBenefit}
              format={formatCurrencyARS}
              className="mt-2 block text-[3rem] font-semibold leading-[0.95] tracking-kpi tabular-nums text-paper sm:text-[4.25rem]"
              aria-label="Beneficio financiero total"
            />
          </div>

          <div className="sm:text-right sm:border-l sm:border-white/10 sm:pl-8">
            <p className="text-[13px] font-medium text-sage-100/70">
              Sobre un volumen de
            </p>
            <CountUp
              value={result.totalVolume}
              format={formatCurrencyARS}
              className="mt-1.5 block text-[1.5rem] font-semibold tracking-kpi tabular-nums text-paper sm:text-[1.75rem]"
            />
            <CountUp
              value={result.effectiveRate}
              format={(v) => formatPercentDot(v)}
              className="mt-2 block text-[2.5rem] font-semibold tracking-kpi tabular-nums text-paper sm:text-[3rem]"
              aria-label="Tasa efectiva combinada"
            />
            <p className="mt-1 text-[13px] font-medium text-sage-100/70">
              tasa efectiva combinada
            </p>
          </div>
        </div>

        <div aria-hidden className="my-8 divider-hair-light" />

        {/* Subcards */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <Subcard
            title="Ahorro efectivo"
            value={result.debitCreditTotal}
            tagLabel="Imp. Deb. y Créd."
            tagVariant="sageSolid"
          />
          <Subcard
            title="Capital de trabajo liberado"
            value={result.iibbRetained}
            tagLabel="Ret. IIBB anticipada"
            tagVariant="onDark"
          />
        </div>
      </div>
    </motion.section>
  );
}

interface SubcardProps {
  title: string;
  value: number;
  tagLabel: string;
  tagVariant: "sageSolid" | "onDark";
}

function Subcard({ title, value, tagLabel, tagVariant }: SubcardProps) {
  return (
    <div className="relative rounded-xl border border-white/10 bg-white/[0.04] p-5 text-center transition-colors hover:bg-white/[0.07]">
      <p className="text-[12px] font-medium text-sage-100/80">{title}</p>
      <CountUp
        value={value}
        format={formatCurrencyARS}
        className="mt-2 block text-[1.75rem] font-semibold tracking-kpi tabular-nums text-paper sm:text-[2.25rem]"
      />
      <div className="mt-3 flex justify-center">
        <Badge
          variant={tagVariant}
          className="text-[10px] font-medium uppercase tracking-[0.1em]"
        >
          {tagLabel}
        </Badge>
      </div>
    </div>
  );
}
