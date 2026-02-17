"use client";

import { useEffect, useMemo, useState } from "react";
import { Moon, Sun, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeMode = "light" | "dark";

function getPreferredTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as ThemeMode | null;
    const initial = stored ?? getPreferredTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem("theme", theme);
    applyTheme(theme);
  }, [theme, mounted]);

  const isDark = theme === "dark";
  const label = useMemo(() => (isDark ? "Switch to light mode" : "Switch to dark mode"), [isDark]);

  // Avoid a flash of the wrong position before hydration.
  if (!mounted) return null;

  return (
    <div className="fixed right-4 top-4 z-50 select-none">
      <button
        type="button"
        aria-label={label}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={cn(
          "group relative h-12 w-[148px] rounded-full p-[2px] transition-transform",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/30 active:scale-[0.99]"
        )}
      >
        {/* Glow border */}
        <span
          className={cn(
            "absolute inset-0 rounded-full opacity-90 blur-md transition-opacity group-hover:opacity-100",
            "bg-gradient-to-r from-pink-500 via-purple-500 to-sky-400"
          )}
        />

        {/* Shell */}
        <span
          className={cn(
            "relative flex h-full w-full items-center rounded-full border backdrop-blur-md",
            "border-white/10 bg-black/35 dark:bg-black/55"
          )}
        >
          {/* Slider */}
          <span
            className={cn(
              "absolute left-1 top-1 grid size-10 place-items-center rounded-full shadow-lg transition-transform duration-300 ease-out",
              "bg-white/90 text-slate-900 dark:bg-slate-950 dark:text-slate-50",
              isDark ? "translate-x-[96px]" : "translate-x-0"
            )}
          >
            {isDark ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </span>

          {/* Labels */}
          <span className="relative flex w-full items-center justify-between px-4 text-[11px] font-bold uppercase tracking-[0.28em]">
            <span
              className={cn(
                "flex items-center gap-1 transition-colors",
                isDark ? "text-slate-400" : "text-slate-100"
              )}
            >
              <Sun className="h-4 w-4 opacity-90" />
              Light
            </span>
            <span
              className={cn(
                "flex items-center gap-1 transition-colors",
                isDark ? "text-slate-100" : "text-slate-400"
              )}
            >
              <Moon className="h-4 w-4 opacity-90" />
              Dark
            </span>
          </span>

          {/* Tiny accent sparkles */}
          <Sparkles className="absolute -right-2 -top-2 h-5 w-5 text-pink-300/80 drop-shadow-[0_0_12px_rgba(236,72,153,0.9)]" />
        </span>
      </button>
    </div>
  );
}

