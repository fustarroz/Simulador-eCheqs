"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/count-up";
import { formatARS, formatCurrencyARS } from "@/lib/format";
import type { SimulatorResult } from "@/lib/types";

const easeInst = [0.32, 0.72, 0, 1] as const;

interface DebitCreditCardProps {
  result: SimulatorResult;
}

export function DebitCreditCard({ result }: DebitCreditCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: easeInst }}
    >
      <Card className="p-7 sm:p-9">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <Badge variant="sage" className="uppercase tracking-[0.12em]">
              Ahorro efectivo
            </Badge>
            <h3 className="mt-3 text-[1.375rem] font-semibold leading-[1.2] tracking-tight2 text-ink sm:text-[1.5rem] dark:text-foreground">
              Impuesto al Débito y Crédito
            </h3>
          </div>
          <div className="text-right">
            <CountUp
              value={result.debitCreditTotal}
              format={formatCurrencyARS}
              className="block text-[2rem] font-semibold leading-none tracking-kpi tabular-nums text-sage-700 sm:text-[2.5rem] dark:text-sage-300"
            />
            <p className="mt-1.5 text-xs font-medium text-smoke tabular-nums">
              1,2% s/ volumen
            </p>
          </div>
        </header>

        <p className="mt-5 text-[14px] leading-relaxed text-ink2 dark:text-foreground/75 sm:text-[15px]">
          Se elimina por completo. No se paga en ningún momento ni de ninguna
          forma.
        </p>

        <div className="mt-6 space-y-2">
          <LineItem
            label="Imp. al débito"
            pct="0,6%"
            value={result.debitTaxSaving}
          />
          <LineItem
            label="Imp. al crédito"
            pct="0,6%"
            value={result.creditTaxSaving}
          />
        </div>
      </Card>
    </motion.div>
  );
}

function LineItem({
  label,
  pct,
  value,
}: {
  label: string;
  pct: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-paper2 px-4 py-3 dark:bg-secondary/60">
      <div className="flex items-center gap-2.5">
        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage-500" />
        <span className="text-[14px] font-medium text-ink dark:text-foreground">
          {label}
        </span>
        <span className="text-xs font-medium text-smoke tabular-nums">{pct}</span>
      </div>
      <CountUp
        value={value}
        format={formatARS}
        className="text-[14px] font-semibold tabular-nums text-ink dark:text-foreground"
      />
    </div>
  );
}
