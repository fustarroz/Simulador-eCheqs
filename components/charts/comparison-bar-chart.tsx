"use client";

import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import { formatARS, formatCurrencyARS } from "@/lib/format";
import type { SimulatorResult } from "@/lib/types";

const easeInst = [0.32, 0.72, 0, 1] as const;
const SAGE_700 = "#324938";
const SAGE_400 = "#6f9079";
const COST_RUST = "#9c4a37";

interface ComparisonBarChartProps {
  result: SimulatorResult;
}

export function ComparisonBarChart({ result }: ComparisonBarChartProps) {
  const bankCost = result.debitCreditTotal + result.iibbRetained;
  const bankLiquidity = result.totalVolume - bankCost;
  const alycLiquidity = result.totalVolume;

  const data = [
    { scenario: "Banco", costo: bankCost,  liquidez: bankLiquidity },
    { scenario: "ALyC",  costo: 0,         liquidez: alycLiquidity },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.75, delay: 0.05, ease: easeInst }}
    >
      <Card className="p-7 sm:p-9">
        <header className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-600 dark:text-sage-400">
            Banco vs. ALyC
          </p>
          <p className="text-[11px] font-medium text-smoke tabular-nums">
            Sobre {formatCurrencyARS(result.totalVolume)} en {result.months} meses
          </p>
        </header>

        <div className="h-72 w-full sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 8, left: -12, bottom: 0 }}
              barCategoryGap="40%"
            >
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis
                dataKey="scenario"
                tick={{
                  fontSize: 12,
                  fill: "hsl(var(--muted-foreground))",
                  fontWeight: 500,
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{
                  fontSize: 11,
                  fill: "hsl(var(--muted-foreground))",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
                tickFormatter={(v) => formatCurrencyARS(v)}
                axisLine={false}
                tickLine={false}
                width={70}
              />
              <Tooltip
                content={<BarTooltip />}
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
              />
              <Legend
                content={() => (
                  <ul className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-smoke">
                    <li className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ background: SAGE_700 }} />
                      Liquidez disponible
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ background: COST_RUST }} />
                      Costo fiscal
                    </li>
                  </ul>
                )}
              />
              <Bar
                dataKey="liquidez"
                stackId="a"
                barSize={44}
                radius={[0, 0, 6, 6]}
                isAnimationActive
                animationDuration={800}
              >
                {data.map((e) => (
                  <Cell
                    key={e.scenario}
                    fill={e.scenario === "ALyC" ? SAGE_700 : SAGE_400}
                  />
                ))}
              </Bar>
              <Bar
                dataKey="costo"
                stackId="a"
                barSize={44}
                fill={COST_RUST}
                radius={[6, 6, 0, 0]}
                isAnimationActive
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
  dataKey: string;
}

function BarTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-line bg-popover px-3.5 py-2.5 text-xs shadow-card-lg">
      <p className="font-semibold text-ink dark:text-foreground">{label}</p>
      <ul className="mt-2 space-y-1">
        {payload.map((p) => (
          <li key={p.dataKey} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 font-medium text-smoke">
              <span className="h-2 w-2 rounded-sm" style={{ background: p.color }} />
              {p.dataKey === "liquidez" ? "Liquidez" : "Costo fiscal"}
            </span>
            <span className="font-semibold tabular-nums text-ink dark:text-foreground">
              {formatARS(p.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
