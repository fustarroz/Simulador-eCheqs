/**
 * Formatea un número como ARS abreviado: $720K, $2.8M, $1.2B.
 * Pensado para los KPIs gigantes del hero/result card donde el espacio importa.
 */
export function formatCurrencyARS(value: number): string {
  if (!Number.isFinite(value)) return "$0";

  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (abs >= 1_000_000_000) {
    // Siempre 1 decimal para B: $1.2B, $12.0B
    return `${sign}$${(abs / 1_000_000_000).toFixed(1)}B`;
  }
  if (abs >= 1_000_000) {
    // Siempre 1 decimal para M para que el formato sea consistente:
    // $2.8M, $60.0M, $100.0M — coincide con el reference de la mockup.
    return `${sign}$${(abs / 1_000_000).toFixed(1)}M`;
  }
  if (abs >= 1_000) {
    // K se muestra sin decimal — $720K, $500K
    return `${sign}$${Math.round(abs / 1_000)}K`;
  }
  return `${sign}$${Math.round(abs)}`;
}

/**
 * Formatea un número con separadores de miles AR ($60.000.000).
 * Usado en breakdowns donde se busca precisión total.
 */
export function formatARS(value: number): string {
  if (!Number.isFinite(value)) return "$0";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formatea un porcentaje con coma decimal: 4,70 %.
 */
export function formatPercent(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return "0%";
  return `${value.toFixed(decimals).replace(".", ",")}%`;
}

/**
 * Variante que mantiene el punto decimal (4.70%) — útil para títulos
 * tipográficos donde la coma puede romper la jerarquía visual.
 */
export function formatPercentDot(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return "0%";
  return `${value.toFixed(decimals)}%`;
}

