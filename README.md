# Simulador eCheq ALyC · Grupo IEB

Calculadora web institucional que cuantifica el ahorro impositivo y la mejora
de capital de trabajo que obtiene una empresa argentina al depositar eCheqs
en una cuenta comitente de **ALyC** en vez de hacerlo en una cuenta bancaria
tradicional.

Diseño institucional inspirado en wealth management (Morgan Stanley, JP Morgan
Private Banking, Balanz), con paleta sage + papel cálido, tipografía editorial
(Fraunces + Manrope), y motor financiero alimentado por una **matriz real de
alícuotas IIBB 2026** diferenciadas por provincia × actividad.

## Stack

- **Next.js 14** (App Router) + **TypeScript** strict
- **TailwindCSS** con design tokens propios
- **shadcn/ui** locales (Card, Select, Slider, Label, Badge, Skeleton)
- **Framer Motion** — entradas escalonadas sutiles
- **Recharts** — donut + bar chart con paleta institucional
- **Lucide Icons**
- **next-themes** — dark mode opcional
- **Fraunces** (display serif) + **Manrope** (sans body)

## Setup

```bash
pnpm install        # o npm/yarn
pnpm dev            # localhost:3000
pnpm build && pnpm start
pnpm typecheck
```

Requiere Node.js ≥ 18.18.

## Cambios respecto de versiones anteriores

### Nueva actividad
Se agregó **Servicios Primarios (Agrícola / Ganadero)** como cuarta categoría.
Es comercialmente clave para clientes agro: muchas provincias eximen o reducen
drásticamente la alícuota IIBB para producción primaria.

### Matriz real de alícuotas IIBB (período fiscal 2026)

| Provincia    | Comercio | Servicios | Industria | Agro/Ganadero |
| ------------ | -------- | --------- | --------- | ------------- |
| CABA         | 5,00 %   | 5,00 %    | 1,00 %    | 0,00 %        |
| Buenos Aires | 5,00 %   | 5,00 %    | 1,75 %    | 0,75 %        |
| Córdoba      | 4,75 %   | 4,75 %    | 1,50 %    | 0,75 %        |
| Santa Fe     | 4,50 %   | 4,50 %    | 1,50 %    | 0,00 %        |
| Mendoza      | 4,00 %   | 4,50 %    | 1,50 %    | 1,00 %        |
| Tucumán      | 5,25 %   | 5,50 %    | 2,00 %    | 1,00 %        |
| Entre Ríos   | 4,25 %   | 4,50 %    | 2,00 %    | 1,00 %        |
| Salta        | 3,50 %   | 4,50 %    | 2,50 %    | 1,00 %        |
| Misiones     | 4,80 %   | 4,80 %    | 2,50 %    | 1,50 %        |
| Chaco        | 5,20 %   | 5,20 %    | 2,50 %    | 1,50 %        |
| Corrientes   | 4,40 %   | 4,50 %    | 2,50 %    | 1,00 %        |
| Jujuy        | 3,80 %   | 4,50 %    | 2,50 %    | 1,50 %        |

**Fuentes principales (período fiscal 2026):**
- Ley Tarifaria CABA 2026 (Ley 6927) — AGIP
- Ley Impositiva Buenos Aires 2026 (Ley 15.558) — ARBA
- Estabilidad fiscal Santa Fe (Leyes 13.749 / 13.750)
- Compilados profesionales (Errepar, Arizmendi, BDO)
- Códigos tributarios provinciales 2025/2026

Los valores son orientativos para empresas medianas-grandes fuera de regímenes
PyME y promocionales. **No reemplazan asesoramiento contable profesional.**
Las alícuotas reales pueden variar por código NAES/NAIIB, tramo de
facturación, condición frente al régimen MiPyME y régimen de convenio
multilateral.

### Engine actualizado
- La alícuota IIBB ahora se resuelve por **provincia × actividad** (matriz).
- Coeficiente de base imponible variable por actividad (Comercio 100%,
  Servicios 95%, Industria 85%, Servicios Primarios 90%).
- Defensive coding: `resolveIibbRate()` con fallback (4%), validación de
  volumen no-finito, división por cero controlada.

### Rebranding visual
- **Paleta:** sage greens (verde institucional muteado) + neutros papel/tinta.
  Inspiración Morgan Stanley / JP Morgan Private Banking. Sin azules
  electric/fintech, sin saturación alta.
- **Tipografía:** Fraunces (serif editorial) para KPIs y headlines, Manrope
  (sans premium) para body y UI.
- **Hero:** logo Grupo IEB top-left, badge de vigencia normativa,
  encabezado serif sobre papel cálido (no más gradiente azul).
- **Result card:** fondo verde forest profundo en lugar de azul.
- **Charts:** sage-700 + olive-500 (donut), charcoal para "costo fiscal"
  (no más rojo estridente).
- **Radii:** más conservadores (0.75–1.25rem vs. 1.25–1.75rem).
- **Sombras:** hairline, casi imperceptibles.
- **Animaciones:** durations más largas (700–900 ms), cubic-bezier de
  Apple (0.32, 0.72, 0, 1), translates de 6–8 px en lugar de 16 px.

## Estructura

```
echeq-simulator/
├── app/
│   ├── globals.css           # CSS variables sage/paper, textura papel
│   ├── layout.tsx            # Fraunces + Manrope, SEO, providers
│   └── page.tsx              # Hero + Simulator + footer técnico
├── components/
│   ├── hero.tsx              # Logo IEB, serif title, sage palette
│   ├── simulator.tsx
│   ├── simulator-client.tsx
│   ├── simulator-skeleton.tsx
│   ├── parameters-panel.tsx  # Slider + 4 actividades + matriz IIBB
│   ├── result-card.tsx       # Forest green KPI panel
│   ├── count-up.tsx
│   ├── theme-toggle.tsx
│   ├── providers.tsx
│   ├── breakdown/
│   │   ├── debit-credit-card.tsx
│   │   ├── iibb-card.tsx
│   │   └── proportional-breakdown.tsx
│   ├── charts/
│   │   ├── donut-chart.tsx
│   │   └── comparison-bar-chart.tsx
│   └── ui/                   # shadcn primitives en paleta sage
├── hooks/
├── lib/
│   ├── calculations.ts       # Engine + resolveIibbRate()
│   ├── constants.ts          # Matriz PROVINCE_RATES documentada
│   ├── format.ts
│   ├── slider-scale.ts       # Log-scale $500K..$5B
│   ├── types.ts
│   └── utils.ts
└── public/
    ├── favicon.svg
    └── grupo-ieb.png         # Logo institucional
```

## Reglas financieras

```
debitCreditTotal = volumenTotal × 1,2 %                    // 0,6 % débito + 0,6 % crédito
iibbBase         = volumenTotal × coefActividad
iibbRetained     = iibbBase × (alícuotaIIBB / 100) × 70 %
totalBenefit     = debitCreditTotal + iibbRetained
effectiveRate    = totalBenefit / volumenTotal × 100
```

### Slider de volumen — escala logarítmica $500K..$5B
- pos 0: $500K · pos 250: $5M · pos 500: $50M · pos 750: $500M · pos 1000: $5B
- Redondeo "nice" escalonado por magnitud (mult. de $100K bajo $10M; $5M de
  $100M a $1B; $50M sobre $1B).

### Logo Grupo IEB
- Light mode: charcoal sobre papel cálido — la versión original
- Dark mode: invertido vía `filter: invert() brightness(200%)` — wordmark
  blanco sobre fondo sage profundo

### Disclaimer
Aplicación con propósito comercial / informativo. **Las alícuotas son
orientativas. No reemplazan asesoramiento contable profesional.**
