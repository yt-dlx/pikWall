"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-full bg-gray-800 dark:bg-gray-200 text-gray-200 dark:text-gray-800">
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
