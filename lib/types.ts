/**
 * Las cuatro categorías visibles al usuario.
 *
 * "Servicios Primarios" agrupa actividades agrícolas, ganaderas, forestales y
 * pesqueras. Se trata por separado porque en la mayoría de las provincias
 * argentinas la producción primaria tiene alícuotas marcadamente reducidas
 * (con frecuencia 0%–1,5%) o exenciones — un hecho clave para clientes
 * agropecuarios cuyo análisis comercial cambia totalmente vs. comercio puro.
 */
export type Activity =
  | "Comercio"
  | "Servicios"
  | "Industria"
  | "Servicios Primarios";

/**
 * Clave interna usada para indexar la matriz de alícuotas. Separamos el
 * label visible del slug técnico para poder cambiar etiquetas sin tocar
 * los datos.
 */
export type ActivityKey =
  | "comercio"
  | "servicios"
  | "industria"
  | "agricolaGanadero";

export type Horizon = "Trimestre" | "Semestre" | "Año completo";

export type Province =
  | "CABA"
  | "Buenos Aires"
  | "Córdoba"
  | "Santa Fe"
  | "Mendoza"
  | "Tucumán"
  | "Entre Ríos"
  | "Salta"
  | "Misiones"
  | "Chaco"
  | "Corrientes"
  | "Jujuy";

/** Alícuotas IIBB (en %) para cada actividad dentro de una provincia. */
export type ProvinceRates = Record<ActivityKey, number>;

export interface SimulatorInput {
  monthlyVolume: number;
  activity: Activity;
  horizon: Horizon;
  province: Province;
}

export interface SimulatorResult {
  months: number;
  totalVolume: number;
  iibbRate: number;
  debitTaxSaving: number;
  creditTaxSaving: number;
  debitCreditTotal: number;
  iibbBase: number;
  iibbRetained: number;
  totalBenefit: number;
  effectiveRate: number;
}
