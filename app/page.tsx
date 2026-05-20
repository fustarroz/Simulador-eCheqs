import { Hero } from "@/components/hero";
import { SimulatorClient } from "@/components/simulator-client";

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-background pb-20">
      <Hero />

      <div className="mx-auto max-w-6xl px-5 pt-8 sm:px-8 sm:pt-10 lg:px-10">
        <SimulatorClient />
      </div>

      {/* Disclaimer institucional */}
      <footer className="mx-auto mt-16 max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="rounded-xl border border-line bg-card/50 p-6 sm:p-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-600 dark:text-sage-400">
            Notas técnicas
          </p>
          <div className="mt-3 grid gap-3 text-[13px] leading-relaxed text-ink2 sm:grid-cols-3 dark:text-foreground/75">
            <p>
              <strong className="font-semibold text-ink dark:text-foreground">
                Impuesto al Débito y Crédito:
              </strong>{" "}
              0,6% débito + 0,6% crédito = 1,2% sobre el movimiento bancario.
              Se elimina al circular eCheqs por cuenta comitente de ALyC.
            </p>
            <p>
              <strong className="font-semibold text-ink dark:text-foreground">
                Retención anticipada de IIBB:
              </strong>{" "}
              constituye una mejora de capital de trabajo, no un ahorro
              impositivo: el impuesto se paga igual en su vencimiento
              ordinario.
            </p>
            <p>
              <strong className="font-semibold text-ink dark:text-foreground">
                Alícuotas:
              </strong>{" "}
              valores orientativos para período fiscal 2026. No reemplazan
              asesoramiento contable profesional; pueden variar por código
              NAES/NAIIB, tramo y régimen.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
