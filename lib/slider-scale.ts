import { SLIDER_STEPS, VOLUME_MAX, VOLUME_MIN } from "./constants";

const LOG_MIN = Math.log10(VOLUME_MIN);
const LOG_MAX = Math.log10(VOLUME_MAX);

/**
 * Convierte el índice del slider (0..SLIDER_STEPS) a un volumen real,
 * con escala logarítmica y redondeo "nice" según la magnitud.
 *
 * Ejemplos:
 *   sliderToVolume(0)    → $500.000
 *   sliderToVolume(250)  → $5.000.000
 *   sliderToVolume(500)  → $50.000.000
 *   sliderToVolume(750)  → $500.000.000
 *   sliderToVolume(1000) → $5.000.000.000
 */
export function sliderToVolume(index: number): number {
  const clamped = Math.max(0, Math.min(SLIDER_STEPS, index));
  const t = clamped / SLIDER_STEPS;
  const raw = Math.pow(10, LOG_MIN + (LOG_MAX - LOG_MIN) * t);

  // Redondeo escalonado para evitar valores como $4.738.291
  if (raw >= 1_000_000_000) return Math.round(raw / 50_000_000) * 50_000_000;
  if (raw >= 100_000_000)   return Math.round(raw / 5_000_000)  * 5_000_000;
  if (raw >= 10_000_000)    return Math.round(raw / 500_000)    * 500_000;
  return Math.round(raw / 100_000) * 100_000;
}

/**
 * Inversa: dado un volumen, devuelve el índice de slider más cercano.
 * Usado para inicializar el slider desde un valor por defecto.
 */
export function volumeToSlider(volume: number): number {
  if (volume <= VOLUME_MIN) return 0;
  if (volume >= VOLUME_MAX) return SLIDER_STEPS;
  const t = (Math.log10(volume) - LOG_MIN) / (LOG_MAX - LOG_MIN);
  return Math.round(t * SLIDER_STEPS);
}
