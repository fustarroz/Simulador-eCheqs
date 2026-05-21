import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://simulador-e-cheqs-ro7i.vercel.app";
const TITLE = "Simulador eCheq ALyC";
const DESCRIPTION =
  "Cuantificá el ahorro impositivo y la liquidez liberada al circular tus cheques electrónicos por una cuenta comitente de ALyC vs. una cuenta bancaria tradicional. Análisis por provincia, actividad y horizonte temporal.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "eCheq", "ALyC", "cheque electrónico", "impuesto al débito y crédito",
    "ingresos brutos", "IIBB", "capital de trabajo", "Argentina",
    "wealth management", "tesorería corporativa",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: TITLE,
    locale: "es_AR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#101810" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-dvh bg-background antialiased">
        <Providers>
          {children}
          <ThemeToggle />
        </Providers>
      </body>
    </html>
  );
}
