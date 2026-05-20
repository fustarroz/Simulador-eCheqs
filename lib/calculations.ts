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

/**
 * Resuelve la alícuota IIBB para una combinación de provincia y actividad,
 * con fallback defensivo si la clave no existe en la matriz.
 */
export function resolveIibbRate(
  province: Province,
  activity: Activity,
): number {
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
 * Cambios respecto de la versión anterior:
 *  - La alícuota IIBB depende ahora de provincia × actividad (matriz).
 *  - El coeficiente de base imponible varía según actividad.
 *  - Casos edge: volumen 0, alícuota 0 y horizontes inválidos son
 *    manejados sin dividir por cero.
 *
 * Reglas:
 *  - Ahorro Imp. Deb. y Créd.  = volumen × 1,2 %
 *  - Capital liberado IIBB     = baseImponible × alícuota × 70 %
 *  - Beneficio total           = ambos
 *  - Tasa efectiva             = beneficio / volumen × 100
 */
export function simulate(input: SimulatorInput): SimulatorResult {
  const { monthlyVolume, activity, horizon, province } = input;

  // Validaciones defensivas
  const safeVolume = Number.isFinite(monthlyVolume) && monthlyVolume > 0
    ? monthlyVolume
    : 0;
  const months = HORIZON_MONTHS[horizon] ?? 12;
  const totalVolume = safeVolume * months;

  const iibbRate = resolveIibbRate(province, activity);

  // 1) Impuesto al Débito y Crédito
  const debitTaxSaving = totalVolume * DEBIT_RATE;
  const creditTaxSaving = totalVolume * CREDIT_RATE;
  const debitCreditTotal = debitTaxSaving + creditTaxSaving;

  // 2) Retención anticipada de IIBB
  const baseCoef = ACTIVITY_BASE_COEFFICIENT[activity] ?? 1.0;
  const iibbBase = totalVolume * baseCoef;
  const iibbRetained = iibbBase * (iibbRate / 100) * BANK_IIBB_RETENTION;

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
