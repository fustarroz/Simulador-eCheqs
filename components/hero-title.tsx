"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const easeInst = [0.32, 0.72, 0, 1] as const;

/**
 * Bloque de título principal — vive en la columna izquierda del grid
 * superior, a la altura visual del donut compacto que está a la derecha.
 *
 * En mobile colapsa por encima del donut.
 */
export function HeroTitle() {
  return (
    <div className="flex h-full flex-col justify-center py-2 sm:py-4">
      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05, ease: easeInst }}
        className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-600 dark:text-sage-400"
      >
        Análisis de tesorería corporativa
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.12, ease: easeInst }}
        className="mt-4 text-[2.5rem] font-semibold leading-[1.04] tracking-kpi text-ink sm:text-[3rem] md:text-[3.5rem] dark:text-foreground"
      >
        Simulador eCheq ALyC
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.22, ease: easeInst }}
        className="mt-5 max-w-md text-[15px] font-normal leading-relaxed text-ink2 sm:text-base dark:text-foreground/75"
      >
        Cuantificá el beneficio de circular tus cheques electrónicos por una
        cuenta comitente de ALyC frente al circuito bancario tradicional —
        ahorro impositivo y mejora de capital de trabajo, diferenciados por
        jurisdicción y actividad.
      </motion.p>

      {/* Badge regulatorio en mobile, dentro del bloque de título */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.32, ease: easeInst }}
        className="mt-6 sm:hidden"
      >
        <Badge variant="regulatory">
          <span className="h-1.5 w-1.5 rounded-full bg-sage-500" />
          <span>Vigencia normativa · eCheqs en ALyC</span>
        </Badge>
      </motion.div>
    </div>
  );
}
