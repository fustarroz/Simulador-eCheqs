"use client";

import dynamic from "next/dynamic";
import { SimulatorSkeleton } from "@/components/simulator-skeleton";

/**
 * Wrapper de cliente alrededor del dynamic import del simulador.
 *
 * Next.js 14 (App Router) no permite `dynamic(..., { ssr: false })` desde
 * un Server Component, así que aislamos esa llamada en este componente
 * cliente y lo importamos desde `app/page.tsx` (server) sin penalidad.
 *
 * Beneficios:
 *   - El bundle del simulador (Recharts, Framer Motion, Radix) se descarga
 *     solo cuando se necesita.
 *   - Mientras tanto, el usuario ve el `SimulatorSkeleton` real, evitando
 *     layout shift.
 */
const Simulator = dynamic(
  () => import("@/components/simulator").then((m) => m.Simulator),
  {
    loading: () => <SimulatorSkeleton />,
    ssr: false,
  },
);

export function SimulatorClient() {
  return <Simulator />;
}
