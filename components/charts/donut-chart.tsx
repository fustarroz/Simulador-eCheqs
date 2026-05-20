"use client";

import { motion } from "framer-motion";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card } from "@/components/ui/card";
import { CountUp } from "@/components/count-up";
import { formatARS } from "@/lib/format";
import type { SimulatorResult } from "@/lib/types";

const easeInst = [0.32, 0.72, 0, 1] as const;
const SAGE_700 = "#324938";
const OLIVE_500 = "#7b8161";

interface BenefitDonutProps {
  result: SimulatorResult;
}

/**
 * Donut compacto para el hero card — donut a la izquierda, leyenda
 * vertical (nombre, monto, %) a la derecha. Sized para encajar al lado
 * del título principal en desktop sin abrumar.
 */
export function BenefitDonut({ result }: BenefitDonutProps) {
  const data = [
    { name: "Ahorro impuestos",  value: result.debitCreditTotal, color: SAGE_700 },
    { name: "Liquidez liberada", value: result.iibbRetained,     color: OLIVE_500 },
  ];
  const total = result.totalBenefit || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: easeInst }}
    >
      <Card className="p-6 sm:p-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-600 dark:text-sage-400">
          Composición del beneficio
        </p>

        <div className="mt-5 grid grid-cols-[1fr_1.25fr] items-center gap-5 sm:gap-6">
          {/* Donut */}
          <div className="relative aspect-square w-full max-w-[180px] justify-self-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius="66%"
                  outerRadius="94%"
                  paddingAngle={1.5}
                  dataKey="value"
                  stroke="none"
                  startAngle={90}
                  endAngle={-270}
                  isAnimationActive
                  animationDuration={900}
                  animationEasing="ease-out"
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<DonutTooltip total={total} />} cursor={{ fill: "transparent" }} />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-smoke">
                Total
              </p>
              <CountUp
                value={result.totalBenefit}
                format={formatARS}
                className="mt-1.5 block text-[15px] font-semibold leading-none tracking-kpi tabular-nums text-ink dark:text-foreground sm:text-[16px]"
              />
            </div>
          </div>

          {/* Legend */}
          <ul className="space-y-3.5">
            {data.map((d) => {
              const pct = (d.value / total) * 100;
              return (
                <li key={d.name} className="flex items-start gap-2.5">
                  <span
                    aria-hidden
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-sm"
                    style={{ background: d.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium leading-tight text-ink dark:text-foreground">
                      {d.name}
                    </p>
                    <p className="mt-1 text-[13px] font-semibold tabular-nums leading-tight text-ink2 dark:text-foreground/85">
                      {formatARS(d.value)}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium tabular-nums text-smoke">
                      {pct.toFixed(1).replace(".", ",")}%
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Card>
    </motion.div>
  );
}

function DonutTooltip({
  active,
  payload,
  total,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { color: string } }>;
  total: number;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const pct = (item.value / total) * 100;
  return (
    <div className="rounded-lg border border-line bg-popover px-3.5 py-2.5 text-xs shadow-card-lg">
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className="h-2 w-2 rounded-sm"
          style={{ background: item.payload.color }}
        />
        <span className="font-semibold text-ink dark:text-foreground">
          {item.name}
        </span>
      </div>
      <p className="mt-1.5 text-[13px] font-medium tabular-nums text-ink dark:text-foreground">
        {formatARS(item.value)}
      </p>
      <p className="text-[11px] font-medium tabular-nums text-smoke">
        {pct.toFixed(1).replace(".", ",")}% del total
      </p>
    </div>
  );
}
