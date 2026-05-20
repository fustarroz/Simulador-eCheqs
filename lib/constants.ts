import type {
  Activity,
  ActivityKey,
  Horizon,
  Province,
  ProvinceRates,
} from "./types";

/**
 * ════════════════════════════════════════════════════════════════════════
 *  MATRIZ DE ALÍCUOTAS IIBB · ARGENTINA · PERÍODO FISCAL 2026
 * ════════════════════════════════════════════════════════════════════════
 *
 * Construida a partir de fuentes públicas, leyes impositivas provinciales
 * y compilados profesionales. Valores orientativos para una empresa de
 * tamaño mediano-grande (fuera de regímenes simplificados o promocionales)
 * con actividad principal localizada en la jurisdicción.
 *
 * Criterios de armado:
 *
 *  • Comercio: alícuota general para venta al por mayor / minorista
 *    sin sector especial. Excluye comercios alcanzados por alícuotas
 *    reducidas para PyMEs (que en BA/CABA bajan a ~3% bajo tramos).
 *
 *  • Servicios: alícuota general de servicios n.c.p. Es típicamente el
 *    sector con presión más alta (servicios financieros, intermediación
 *    y profesionales suelen pagar 5–6%).
 *
 *  • Industria: alícuota general manufacturera, asumiendo establecimiento
 *    industrial radicado en la provincia. Muchas jurisdicciones aplican
 *    alícuotas reducidas o exenciones para industria PyME en origen.
 *
 *  • Servicios Primarios (agrícola/ganadero): producción primaria pura
 *    desarrollada en la jurisdicción. Es donde más diverge el sistema:
 *    CABA exime al 0%, Santa Fe mantiene estabilidad fiscal del agro
 *    (exento PyME), Buenos Aires aplica 0,5%–1% según tramo, y otras
 *    provincias mantienen alícuotas reducidas en torno a 0,75%–1,5%.
 *
 * Fuentes principales (consultadas para 2026):
 *  - Ley Tarifaria CABA 2026 (Ley 6927) — AGIP.
 *  - Ley Impositiva Bs. As. 2026 (Ley 15.558) — ARBA.
 *  - Decretos y leyes impositivas provinciales 2025/2026.
 *  - Estabilidad fiscal Santa Fe (Leyes 13.749 / 13.750).
 *  - Compilados profesionales (Errepar, Arizmendi, BDO).
 *
 * AVISO LEGAL: estos valores no reemplazan asesoramiento contable
 * profesional. Las alícuotas reales pueden variar según código NAES/NAIIB,
 * tramo de facturación, condición frente al régimen MiPyME, beneficios
 * sectoriales vigentes y régimen de convenio multilateral.
 */
export const PROVINCE_RATES: Record<Province, ProvinceRates> = {
  CABA: {
    // Ley Tarifaria 2026 — AGIP. Comercio y servicios: 5%. Industria
    // manufacturera: 1% (Ley 6655, vigente desde julio 2023).
    // Actividades primarias: 0% (reducción a partir de 2023).
    comercio: 5.0,
    servicios: 5.0,
    industria: 1.0,
    agricolaGanadero: 0.0,
  },
  "Buenos Aires": {
    // Ley Impositiva 2026 (Ley 15.558) — ARBA. Comercio general 5%
    // (≥ tramo 1); servicios 5%; industria con establecimiento en
    // provincia 1,75% (art. 27 ley impositiva). Producción primaria
    // 0,75% (art. 21 inc. c, alícuota intermedia para empresas
    // medianas-grandes; tramos PyME van a 0,5%).
    comercio: 5.0,
    servicios: 5.0,
    industria: 1.75,
    agricolaGanadero: 0.75,
  },
  Córdoba: {
    // Código tributario provincial 2025/2026. Comercio general 4,75%.
    // Servicios 4,75% (servicios al agro tienen alícuota reducida).
    // Industria local 1,5%. Producción agropecuaria 0,75%.
    comercio: 4.75,
    servicios: 4.75,
    industria: 1.5,
    agricolaGanadero: 0.75,
  },
  "Santa Fe": {
    // Ley impositiva anual N° 3650 + modif. (Ley 13.750). Comercio general
    // 4,5%. Servicios 4,5%. Industria PyME santafesina 1,5% (general 4,5%
    // para grandes). Sector agropecuario goza de estabilidad fiscal —
    // exento para PyMES sin tope (Ley 13.749).
    comercio: 4.5,
    servicios: 4.5,
    industria: 1.5,
    agricolaGanadero: 0.0,
  },
  Mendoza: {
    // Comercio 4% (estándar histórico). Servicios 4,5%. Industria
    // mendocina 1,5% con beneficios para PyME. Producción primaria 1%.
    comercio: 4.0,
    servicios: 4.5,
    industria: 1.5,
    agricolaGanadero: 1.0,
  },
  Tucumán: {
    // Provincia con presión fiscal alta. Comercio 5,25%. Servicios 5,5%.
    // Industria 2%. Producción primaria 1%.
    comercio: 5.25,
    servicios: 5.5,
    industria: 2.0,
    agricolaGanadero: 1.0,
  },
  "Entre Ríos": {
    // Comercio 4,25%. Servicios 4,5%. Industria 2%. Producción
    // primaria 1% (provincia con fuerte sector agropecuario).
    comercio: 4.25,
    servicios: 4.5,
    industria: 2.0,
    agricolaGanadero: 1.0,
  },
  Salta: {
    // Comercio 3,5% (alícuota baja por estructura comercial). Servicios
    // 4,5%. Industria 2,5%. Producción primaria 1%.
    comercio: 3.5,
    servicios: 4.5,
    industria: 2.5,
    agricolaGanadero: 1.0,
  },
  Misiones: {
    comercio: 4.8,
    servicios: 4.8,
    industria: 2.5,
    agricolaGanadero: 1.5,
  },
  Chaco: {
    comercio: 5.2,
    servicios: 5.2,
    industria: 2.5,
    agricolaGanadero: 1.5,
  },
  Corrientes: {
    comercio: 4.4,
    servicios: 4.5,
    industria: 2.5,
    agricolaGanadero: 1.0,
  },
  Jujuy: {
    comercio: 3.8,
    servicios: 4.5,
    industria: 2.5,
    agricolaGanadero: 1.5,
  },
};

export const PROVINCES = Object.keys(PROVINCE_RATES) as Province[];

/** Alícuota de fallback si una combinación no existiera (defensive coding). */
export const FALLBACK_IIBB_RATE = 4.0;

/**
 * Mapping de label público → slug de la matriz. Centralizado acá para
 * que cambiar un nombre visible no rompa las claves de datos.
 */
export const ACTIVITY_TO_KEY: Record<Activity, ActivityKey> = {
  Comercio: "comercio",
  Servicios: "servicios",
  Industria: "industria",
  "Servicios Primarios": "agricolaGanadero",
};

export const ACTIVITIES: Activity[] = [
  "Comercio",
  "Servicios",
  "Industria",
  "Servicios Primarios",
];

export const HORIZONS: Horizon[] = ["Trimestre", "Semestre", "Año completo"];

export const HORIZON_MONTHS: Record<Horizon, number> = {
  Trimestre: 3,
  Semestre: 6,
  "Año completo": 12,
};

/**
 * Coeficientes que ponderan qué porcentaje del volumen mensual constituye
 * base imponible para IIBB según la actividad. Aproximación de mercado.
 *
 *  - Comercio: el cheque cobrado es ingreso bruto puro (100%).
 *  - Servicios: ~95% — descuenta algunos gastos repercutibles.
 *  - Industria: ~85% — descuenta más costos.
 *  - Servicios Primarios: ~90% — venta de producción con coeficientes
 *    de descuento por insumos y comisiones de comercialización.
 */
export const ACTIVITY_BASE_COEFFICIENT: Record<Activity, number> = {
  Comercio: 1.0,
  Servicios: 0.95,
  Industria: 0.85,
  "Servicios Primarios": 0.9,
};

/** Impuesto al Débito y Crédito */
export const DEBIT_RATE = 0.006;
export const CREDIT_RATE = 0.006;

/** Coeficiente de retención bancaria anticipada de IIBB */
export const BANK_IIBB_RETENTION = 0.7;

/** Slider de volumen mensual — escala logarítmica $500K..$5B */
export const VOLUME_MIN = 500_000;
export const VOLUME_MAX = 5_000_000_000;
export const VOLUME_DEFAULT = 5_000_000;
export const SLIDER_STEPS = 1000;
