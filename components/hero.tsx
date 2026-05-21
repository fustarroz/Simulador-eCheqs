"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const easeInst = [0.32, 0.72, 0, 1] as const;

/**
 * Header institucional minimalista — tagline + badge regulatorio.
 *
 *   GESTIÓN PATRIMONIAL          [ badge normativa ]
 *   MERCADO DE CAPITALES
 *
 * Sin logo. La identidad visual la sostiene el brand bar sage superior,
 * el wash institucional del fondo, y el tagline tipográfico.
 */
export function Hero() {
  return (
    <header className="relative isolate overflow-hidden">
      {/* Brand bar — fina línea sage en el borde superior */}
      <div
        aria-hidden
        className="h-[1.5px] w-full bg-gradient-to-r from-sage-600 via-sage-500 to-sage-700"
      />

      {/* Wash institucional sutil */}
      <div className="relative bg-paper-tex">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-24 h-72 w-72 rounded-full bg-sage-200/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 bottom-0 h-48 w-48 rounded-full bg-olive-100/30 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeInst }}
            className="flex flex-wrap items-center justify-between gap-y-5"
          >
            {/* Tagline 2 líneas — anchor institucional */}
            <div className="flex flex-col gap-1.5">
              <p className="text-[12px] font-semibold uppercase leading-none tracking-[0.22em] text-sage-700 dark:text-sage-300 lg:text-[13px]">
                Gestión Patrimonial
              </p>
              <p className="text-[12px] font-medium uppercase leading-none tracking-[0.22em] text-smoke lg:text-[13px]">
                Mercado de Capitales
              </p>
            </div>

            <Badge variant="regulatory">
              <span className="h-1.5 w-1.5 rounded-full bg-sage-500" />
              <span>Vigencia normativa · eCheqs en ALyC</span>
            </Badge>
          </motion.div>
        </div>

        {/* Hairline inferior */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 divider-hair" />
      </div>
    </header>
  );
}
