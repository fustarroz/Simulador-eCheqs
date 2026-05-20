"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      className="group fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card/95 text-ink shadow-card-lg backdrop-blur-md transition-all hover:bg-paper2 hover:border-sage-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 dark:border-border dark:bg-card/95 dark:text-foreground dark:hover:bg-secondary"
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      >
        {isDark ? (
          <Sun className="h-4 w-4" strokeWidth={2} />
        ) : (
          <Moon className="h-4 w-4" strokeWidth={2} />
        )}
      </motion.span>
    </button>
  );
}
