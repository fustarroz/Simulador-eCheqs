"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CountUp } from "@/components/count-up";
import { formatARS } from "@/lib/format";
import type { Province, SimulatorResult } from "@/lib/types";

const easeInst = [0.32, 0.72, 0, 1] as const;

interface ProportionalBreakdownProps {
  result: SimulatorResult;
  province: Province;
}

export function ProportionalBreakdown({
  result,
  province,
}: ProportionalBreakdownProps) {
  const max = Math.max(
    result.debitTaxSaving,
    result.creditTaxSaving,
    result.iibbRetained,
    1,
  );

  const rows = [
    { label: "Imp. débito",  pct: "0,6%", value: result.debitTaxSaving,  color: "bg-sage-500" },
    { label: "Imp. crédito", pct: "0,6%", value: result.creditTaxSaving, color: "bg-sage-500" },
    { label: `Ret. IIBB · ${province}`, pct: null, value: result.iibbRetained, color: "bg-olive-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: 0.1, ease: easeInst }}
    >
      <Card className="p-7 sm:p-9">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-600 dark:text-sage-400">
          Desglose proporcional
        </p>

        <div className="mt-6 space-y-5">
          {rows.map((r) => {
            const width = Math.max(2, (r.value / max) * 100);
            return (
              <div key={r.label}>
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-[14px] font-medium text-ink dark:text-foreground">
                    {r.label}
                    {r.pct ? (
                      <span className="ml-1.5 text-smoke tabular-nums">({r.pct})</span>
                    ) : null}
                  </p>
                  <CountUp
                    value={r.value}
                    format={formatARS}
                    className="text-[14px] font-semibold tabular-nums text-ink dark:text-foreground"
                  />
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-paper2 dark:bg-secondary/60">
                  <motion.div
                    className={`h-full rounded-full ${r.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 0.9, ease: easeInst }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
