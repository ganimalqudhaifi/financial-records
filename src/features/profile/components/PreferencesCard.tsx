"use client";

import { useState, useEffect } from "react";
import {
  FiSun,
  FiMoon,
  FiMonitor,
  FiGlobe,
  FiMapPin,
} from "react-icons/fi";

type ThemeMode = "light" | "dark" | "system";

const themeOptions: { value: ThemeMode; label: string; icon: typeof FiSun }[] =
  [
    { value: "light", label: "Terang", icon: FiSun },
    { value: "dark", label: "Gelap", icon: FiMoon },
    { value: "system", label: "Sistem", icon: FiMonitor },
  ];

export default function PreferencesCard() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");

  // Read current theme on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") as ThemeMode | null;
    if (stored && ["light", "dark", "system"].includes(stored)) {
      setThemeMode(stored);
    }
  }, []);

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
    localStorage.setItem("theme", mode);

    if (mode === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    } else {
      document.documentElement.classList.toggle("dark", mode === "dark");
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
        Preferensi Aplikasi
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Sesuaikan tampilan dan pengaturan aplikasi
      </p>

      <div className="mt-6 space-y-6">
        {/* Theme selector */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            <FiMoon className="w-4 h-4 text-slate-400" />
            Tema Tampilan
          </label>
          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map((option) => {
              const isActive = themeMode === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleThemeChange(option.value)}
                  className={`flex flex-col items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isActive
                      ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Tema ${option.label}`}
                >
                  <option.icon className="w-5 h-5" />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Language selector (UI only) */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            <FiGlobe className="w-4 h-4 text-slate-400" />
            Bahasa
          </label>
          <select
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-base text-slate-900 dark:text-slate-100 transition-colors duration-200 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
            disabled
            aria-label="Pilih bahasa"
          >
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Region selector (UI only) */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            <FiMapPin className="w-4 h-4 text-slate-400" />
            Regional
          </label>
          <select
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-base text-slate-900 dark:text-slate-100 transition-colors duration-200 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
            disabled
            aria-label="Pilih regional"
          >
            <option value="id-ID">Indonesia (ID)</option>
            <option value="en-US">United States (US)</option>
          </select>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400 dark:text-slate-500 italic">
        * Pengaturan bahasa dan regional akan tersedia di versi mendatang
      </p>
    </div>
  );
}
