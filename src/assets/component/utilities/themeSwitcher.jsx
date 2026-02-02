import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./themeprovider";
import React from "react";
const ThemeToggle = () => {
  const { themeMode, setThemeMode } = useTheme();

  const baseBtn =
    "p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110";

  const active = "bg-amber-600 text-white";
  const inactive = "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200";

  return (
    <div className="relative  top-0  right-0 z-50 flex flex-row gap-3 ">
      {/* Light */}
      <button
        aria-label="Light theme"
        onClick={() => setThemeMode("light")}
        className={`${baseBtn} ${
          themeMode === "light" ? active : inactive
        }`}
      >
        <Sun size={20} />
      </button>

      {/* Dark */}
      <button
        aria-label="Dark theme"
        onClick={() => setThemeMode("dark")}
        className={`${baseBtn} ${
          themeMode === "dark" ? active : inactive
        }`}
      >
        <Moon size={20} />
      </button>

      {/* System */}
      <button
        aria-label="System theme"
        onClick={() => setThemeMode("system")}
        className={`${baseBtn} ${
          themeMode === "system" ? active : inactive
        }`}
      >
        <Monitor size={20} />
      </button>
    </div>
  );
};

export default ThemeToggle;
