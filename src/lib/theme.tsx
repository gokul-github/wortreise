"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function paintTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
}

function rememberTheme(theme: Theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* storage can be unavailable */
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial: Theme =
      stored === "dark" || stored === "light" ? stored : prefersDark ? "dark" : "light";
    setThemeState(initial);
    paintTheme(initial);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    rememberTheme(newTheme);
    paintTheme(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((current) => {
      const next: Theme = current === "light" ? "dark" : "light";
      rememberTheme(next);
      paintTheme(next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (value) return value;
  return {
    theme: "light" as Theme,
    toggleTheme: () => {},
    setTheme: () => {},
  };
}
