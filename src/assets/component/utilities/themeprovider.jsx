import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") || "system"
  );

  // Apply Tailwind dark class dynamically
  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = (mode) => {
      if (mode === "light") {
        root.classList.remove("dark");
      } else if (mode === "dark") {
        root.classList.add("dark");
      } else {
        // system
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (isDark) root.classList.add("dark");
        else root.classList.remove("dark");
      }
    };

    applyTheme(themeMode);
    localStorage.setItem("themeMode", themeMode);

    // Listen to system theme changes if mode is system
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => themeMode === "system" && applyTheme("system");
    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
