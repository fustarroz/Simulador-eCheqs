import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      fontFamily: {
        // Una sola familia para toda la UI — sin serif, sin "display".
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        // Sage palette — institutional
        sage: {
          50:  "#f3f6f4",
          100: "#e3ebe5",
          200: "#c4d5c8",
          300: "#9bb6a3",
          400: "#6f9079",
          500: "#4f7259",
          600: "#3d5a45",
          700: "#324938",
          800: "#293a2f",
          900: "#1e2b22",
          950: "#101810",
        },
        olive: {
          100: "#eef0e7",
          400: "#9aa17c",
          500: "#7b8161",
          600: "#5f6549",
        },
        // Neutrals — paper & ink
        paper:  "#fafaf7",
        paper2: "#f3f3ee",
        ink:    "#1a1d1c",
        ink2:   "#2a2f2d",
        smoke:  "#7a8480",
        line:   "#e1e3df",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(15 23 17 / 0.02), 0 2px 8px -2px rgb(15 23 17 / 0.04)",
        "card-lg": "0 1px 2px 0 rgb(15 23 17 / 0.03), 0 8px 24px -6px rgb(15 23 17 / 0.06)",
        glow: "0 24px 48px -28px rgb(50 73 56 / 0.45)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s infinite",
      },
      letterSpacing: {
        // Tracking institucional para titulares y números grandes.
        // -0.022em copia el spacing de SF Pro Display en valores grandes.
        kpi: "-0.022em",
        tight2: "-0.014em",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
