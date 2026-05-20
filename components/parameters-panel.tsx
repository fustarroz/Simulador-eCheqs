"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ACTIVITIES,
  HORIZONS,
  PROVINCES,
  SLIDER_STEPS,
  VOLUME_MAX,
  VOLUME_MIN,
} from "@/lib/constants";
import { resolveIibbRate } from "@/lib/calculations";
import { sliderToVolume, volumeToSlider } from "@/lib/slider-scale";
import { formatCurrencyARS, formatPercentDot } from "@/lib/format";
import type { Activity, Horizon, Province } from "@/lib/types";
import { CountUp } from "@/components/count-up";

const easeInst = [0.32, 0.72, 0, 1] as const;

interface ParametersPanelProps {
  monthlyVolume: number;
  activity: Activity;
  horizon: Horizon;
  province: Province;
  onVolumeChange: (value: number) => void;
  onActivityChange: (value: Activity) => void;
  onHorizonChange: (value: Horizon) => void;
  onProvinceChange: (value: Province) => void;
}

export function ParametersPanel({
  monthlyVolume,
  activity,
  horizon,
  province,
  onVolumeChange,
  onActivityChange,
  onHorizonChange,
  onProvinceChange,
}: ParametersPanelProps) {
  const iibbRate = resolveIibbRate(province, activity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.18, ease: easeInst }}
    >
      <Card className="p-7 sm:p-8 lg:p-9">
        <header className="mb-7 flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-600 dark:text-sage-400">
            Parámetros
          </p>
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-smoke">
            01 / 03
          </span>
        </header>

        {/* Slider full width */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <Label
              htmlFor="volume-slider"
              className="text-[15px] font-medium text-ink dark:text-foreground"
            >
              Volumen mensual de cheques
            </Label>
            <CountUp
              value={monthlyVolume}
              format={formatCurrencyARS}
              duration={400}
              className="text-[1.75rem] font-semibold leading-none tracking-kpi tabular-nums text-sage-700 sm:text-[2rem] dark:text-sage-300"
              aria-label="Volumen mensual seleccionado"
            />
          </div>
          <Slider
            id="volume-slider"
            min={0}
            max={SLIDER_STEPS}
            step={1}
            value={[volumeToSlider(monthlyVolume)]}
            onValueChange={(v) => onVolumeChange(sliderToVolume(v[0] ?? 0))}
            aria-label="Volumen mensual de cheques"
            aria-valuetext={formatCurrencyARS(monthlyVolume)}
          />
          <div className="flex justify-between text-xs font-medium text-smoke tabular-nums">
            <span>{formatCurrencyARS(VOLUME_MIN)}</span>
            <span>{formatCurrencyARS(VOLUME_MAX)}</span>
          </div>
        </div>

        <div aria-hidden className="my-7 divider-hair" />

        {/* 3 columnas en desktop: Actividad | Horizonte | Provincia */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <Field label="Actividad" htmlFor="activity">
            <Select
              value={activity}
              onValueChange={(v) => onActivityChange(v as Activity)}
            >
              <SelectTrigger id="activity" aria-label="Actividad">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ACTIVITIES.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Horizonte" htmlFor="horizon">
            <Select
              value={horizon}
              onValueChange={(v) => onHorizonChange(v as Horizon)}
            >
              <SelectTrigger id="horizon" aria-label="Horizonte">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {HORIZONS.map((h) => (
                  <SelectItem key={h} value={h}>
                    {h}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          {/* Provincia con badge IIBB integrado */}
          <div className="space-y-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="province" className="text-sm">
                Provincia
              </Label>
              <Badge variant="sage" className="font-semibold tabular-nums">
                {formatPercentDot(iibbRate)} IIBB
              </Badge>
            </div>
            <Select
              value={province}
              onValueChange={(v) => onProvinceChange(v as Province)}
            >
              <SelectTrigger id="province" aria-label="Provincia">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROVINCES.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-sm">
        {label}
      </Label>
      {children}
    </div>
  );
}
