import {
  ACTIVITY_BASE_COEFFICIENT,
  ACTIVITY_TO_KEY,
  BANK_IIBB_RETENTION,
  CREDIT_RATE,
  DEBIT_RATE,
  FALLBACK_IIBB_RATE,
  HORIZON_MONTHS,
  PROVINCE_RATES,
} from "./constants";
import type { Activity, Province, SimulatorInput, SimulatorResult } from "./types";

export function resolveIibbRate(province: Province, activity: Activity): number {
  const provinceMatrix = PROVINCE_RATES[province];
  if (!provinceMatrix) return FALLBACK_IIBB_RATE;
  const key = ACTIVITY_TO_KEY[activity];
  const rate = provinceMatrix[key];
  return Number.isFinite(rate) ? rate : FALLBACK_IIBB_RATE;
}

/**
 * Motor financiero del simulador. Pure function — dado el input, retorna
 * todos los valores derivados sin efectos secundarios.
 *
 * Cada componente del beneficio (débito, crédito, IIBB) puede activarse o
 * desactivarse independientemente con los flags includeDebito/includeCredito/
 * includeIibb. Default: los tres true.
 */
export function simulate(input: SimulatorInput): SimulatorResult {
  const {
    monthlyVolume,
    activity,
    horizon,
    province,
    includeDebito = true,
    includeCredito = true,
    includeIibb = true,
  } = input;

  const safeVolume = Number.isFinite(monthlyVolume) && monthlyVolume > 0
    ? monthlyVolume
    : 0;
  const months = HORIZON_MONTHS[horizon] ?? 12;
  const totalVolume = safeVolume * months;

  const iibbRate = resolveIibbRate(province, activity);

  // 1) Impuesto al Débito y Crédito — cada componente independiente
  const debitTaxSaving = includeDebito ? totalVolume * DEBIT_RATE : 0;
  const creditTaxSaving = includeCredito ? totalVolume * CREDIT_RATE : 0;
  const debitCreditTotal = debitTaxSaving + creditTaxSaving;

  // 2) Retención anticipada de IIBB
  const baseCoef = ACTIVITY_BASE_COEFFICIENT[activity] ?? 1.0;
  const iibbBase = totalVolume * baseCoef;
  const iibbRetained = includeIibb
    ? iibbBase * (iibbRate / 100) * BANK_IIBB_RETENTION
    : 0;

  // 3) Beneficio total y tasa efectiva
  const totalBenefit = debitCreditTotal + iibbRetained;
  const effectiveRate =
    totalVolume > 0 ? (totalBenefit / totalVolume) * 100 : 0;

  return {
    months,
    totalVolume,
    iibbRate,
    debitTaxSaving,
    creditTaxSaving,
    debitCreditTotal,
    iibbBase,
    iibbRetained,
    totalBenefit,
    effectiveRate,
  };
}
