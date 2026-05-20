"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const easeInst = [0.32, 0.72, 0, 1] as const;

/**
 * Header institucional — layout editorial corporate banking:
 *
 *   [ LOGO GRUPO IEB ]  │  GESTIÓN PATRIMONIAL         [ badge normativa ]
 *                       │  MERCADO DE CAPITALES
 *
 * En desktop, la composición horizontal con divisor vertical hairline
 * comunica "branch / department" como en JP Morgan / Morgan Stanley.
 * En mobile, el tagline colapsa abajo del logo con un divisor horizontal.
 *
 * El fondo lleva un wash institucional MUY sutil:
 *   • Halo radial sage en la esquina superior derecha
 *   • Wash papel en la parte inferior izquierda
 *   • Hairline divider en el borde inferior
 *   • Brand bar sage de 1.5 px en el borde superior
 */
export function Hero() {
  return (
    <header className="relative isolate overflow-hidden">
      {/* Brand bar — fina línea sage en el borde superior, signal institucional */}
      <div
        aria-hidden
        className="h-[1.5px] w-full bg-gradient-to-r from-sage-600 via-sage-500 to-sage-700"
      />

      {/* Wash institucional sutil — radial gradients + textura papel */}
      <div className="relative bg-paper-tex">
        {/* Halo decorativo apenas visible */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-24 h-72 w-72 rounded-full bg-sage-200/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 bottom-0 h-48 w-48 rounded-full bg-olive-100/30 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          {/* DESKTOP: composite horizontal — logo │ tagline ─────── badge */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeInst }}
            className="flex flex-wrap items-center justify-between gap-y-6"
          >
            <div className="flex items-center gap-5 sm:gap-7 lg:gap-8">
              <Image
                src="/grupo-ieb.png"
                alt="Grupo IEB"
                width={520}
                height={200}
                priority
                sizes="(max-width: 640px) 200px, (max-width: 1024px) 280px, 340px"
                className="h-12 w-auto select-none sm:h-16 lg:h-[4.5rem] dark:invert dark:brightness-200 dark:contrast-100"
              />

              {/* Divisor vertical hairline — hidden en mobile */}
              <div
                aria-hidden
                className="hidden h-12 w-px bg-line sm:block lg:h-14"
              />

              {/* Tagline 2 líneas — hidden en mobile (va abajo) */}
              <div className="hidden flex-col gap-1.5 sm:flex">
                <p className="text-[11px] font-semibold uppercase leading-none tracking-[0.22em] text-sage-700 dark:text-sage-300 lg:text-[12px]">
                  Gestión Patrimonial
                </p>
                <p className="text-[11px] font-medium uppercase leading-none tracking-[0.22em] text-smoke lg:text-[12px]">
                  Mercado de Capitales
                </p>
              </div>
            </div>

            <Badge variant="regulatory" className="hidden sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-sage-500" />
              <span>Vigencia normativa · eCheqs en ALyC</span>
            </Badge>
          </motion.div>

          {/* MOBILE: tagline + badge debajo del logo */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: easeInst }}
            className="mt-5 flex flex-col gap-3 sm:hidden"
          >
            {/* Divisor horizontal hairline para indicar departamento */}
            <div aria-hidden className="h-px w-12 bg-line" />
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-semibold uppercase leading-none tracking-[0.22em] text-sage-700 dark:text-sage-300">
                Gestión Patrimonial
              </p>
              <p className="text-[11px] font-medium uppercase leading-none tracking-[0.22em] text-smoke">
                Mercado de Capitales
              </p>
            </div>
            <div className="pt-1">
              <Badge variant="regulatory">
                <span className="h-1.5 w-1.5 rounded-full bg-sage-500" />
                <span>Vigencia normativa · eCheqs en ALyC</span>
              </Badge>
            </div>
          </motion.div>
        </div>

        {/* Hairline inferior */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 divider-hair" />
      </div>
    </header>
  );
}
