"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/count-up";
import { formatARS, formatCurrencyARS, formatPercentDot } from "@/lib/format";
import type { Activity, Province, SimulatorResult } from "@/lib/types";

const easeInst = [0.32, 0.72, 0, 1] as const;

interface IibbCardProps {
  result: SimulatorResult;
  province: Province;
  activity: Activity;
}

export function IibbCard({ result, province, activity }: IibbCardProps) {
  // Tasa efectiva de retención sobre volumen total (no la alícuota nominal)
  const effectiveRetentionPct =
    result.totalVolume > 0
      ? (result.iibbRetained / result.totalVolume) * 100
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: 0.05, ease: easeInst }}
    >
      <Card className="p-7 sm:p-9">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <Badge variant="olive" className="uppercase tracking-[0.12em]">
              Liquidez liberada
            </Badge>
            <h3 className="mt-3 text-[1.375rem] font-semibold leading-[1.2] tracking-tight2 text-ink sm:text-[1.5rem] dark:text-foreground">
              Retención anticipada de Ingresos Brutos
            </h3>
          </div>
          <div className="text-right">
            <CountUp
              value={result.iibbRetained}
              format={formatCurrencyARS}
              className="block text-[2rem] font-semibold leading-none tracking-kpi tabular-nums text-olive-600 sm:text-[2.5rem] dark:text-olive-400"
            />
            <p className="mt-1.5 text-xs font-medium text-smoke tabular-nums">
              {formatPercentDot(effectiveRetentionPct)} s/ volumen
            </p>
          </div>
        </header>

        <p className="mt-5 text-[14px] leading-relaxed text-ink2 dark:text-foreground/75 sm:text-[15px]">
          El impuesto se paga igual en el vencimiento ordinario — no de forma
          anticipada. Mejora el capital de trabajo disponible.
        </p>

        {/* Mini-tabla institucional */}
        <div className="mt-6 overflow-hidden rounded-lg border border-line bg-paper2/60 dark:border-border dark:bg-secondary/40">
          <table className="w-full text-[13px]">
            <tbody>
              <tr className="border-b border-line/80 dark:border-border/80">
                <td className="py-2.5 pl-4 pr-3 font-medium text-smoke">
                  Provincia
                </td>
                <td className="py-2.5 pr-3 text-right font-semibold text-ink dark:text-foreground">
                  {province}
                </td>
                <td className="border-l border-line/80 py-2.5 pl-4 pr-3 font-medium text-smoke dark:border-border/80">
                  Actividad
                </td>
                <td className="py-2.5 pr-4 text-right font-semibold text-ink dark:text-foreground">
                  {activity}
                </td>
              </tr>
              <tr className="border-b border-line/80 dark:border-border/80">
                <td className="py-2.5 pl-4 pr-3 font-medium text-smoke">
                  Alícuota IIBB
                </td>
                <td className="py-2.5 pr-3 text-right font-semibold tabular-nums text-ink dark:text-foreground">
                  {formatPercentDot(result.iibbRate)}
                </td>
                <td className="border-l border-line/80 py-2.5 pl-4 pr-3 font-medium text-smoke dark:border-border/80">
                  Retención bancaria
                </td>
                <td className="py-2.5 pr-4 text-right font-semibold tabular-nums text-ink dark:text-foreground">
                  70%
                </td>
              </tr>
              <tr>
                <td
                  className="py-3 pl-4 pr-3 font-medium text-smoke"
                  colSpan={3}
                >
                  Capital liberado
                </td>
                <td className="py-3 pr-4 text-right">
                  <CountUp
                    value={result.iibbRetained}
                    format={formatARS}
                    className="font-semibold tabular-nums text-ink dark:text-foreground"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
