"use client";

import {
  ArcElement,
  ChartData,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectAccounts } from "@/features/account/account.selector";
import { selectRecords } from "@/features/records/records.selector";
import categories from "@/shared/data/categories.json";
import Modal from "../../../shared/components/Modal";

ChartJS.register(ArcElement, Tooltip, Legend);

const EXPENSE_CATEGORIES = categories.filter((c) => c.id > 200);

const CHART_COLORS = [
  "#2563EB",
  "#16A34A",
  "#CA8A04",
  "#9333EA",
  "#0891B2",
  "#DC2626",
];

const CATEGORY_ICONS: Record<number, string> = {
  201: "📋",
  202: "💡",
  203: "🍽️",
  204: "🚗",
  205: "🏠",
  206: "🎬",
};

export default function DashboardCategoryChart() {
  const { selectedAccount } = useSelector(selectAccounts);
  const { records } = useSelector(selectRecords);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const expenseByCategory = useMemo(() => {
    if (!records.length || !selectedAccount.id) return [];

    const filtered = records.filter(
      (r) => r.accountId === selectedAccount.id && r.categoryId > 200,
    );

    const map = new Map<number, number>();
    for (const r of filtered) {
      map.set(r.categoryId, (map.get(r.categoryId) || 0) + r.amount);
    }

    return EXPENSE_CATEGORIES.map((cat) => ({
      id: cat.id,
      name: cat.name,
      total: map.get(cat.id) || 0,
    })).filter((c) => c.total > 0);
  }, [records, selectedAccount.id]);

  const totalExpense = useMemo(
    () => expenseByCategory.reduce((s, c) => s + c.total, 0),
    [expenseByCategory],
  );

  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const textColor = isDark ? "#94A3B8" : "#475569";

  const [chartData, setChartData] = useState<ChartData<"doughnut">>({
    datasets: [],
  });

  useEffect(() => {
    if (expenseByCategory.length > 0) {
      setChartData({
        labels: expenseByCategory.map((c) => c.name),
        datasets: [
          {
            data: expenseByCategory.map((c) => c.total),
            backgroundColor: expenseByCategory.map(
              (_, i) => CHART_COLORS[i % CHART_COLORS.length],
            ),
            borderColor: isDark ? "#0F172A" : "#FFFFFF",
            borderWidth: 2,
            hoverOffset: 8,
          },
        ],
      });
    } else {
      setChartData({
        labels: ["Belum ada data"],
        datasets: [
          {
            data: [1],
            backgroundColor: ["#E2E8F0"],
            borderColor: isDark ? "#0F172A" : "#FFFFFF",
            borderWidth: 2,
          },
        ],
      });
    }
  }, [expenseByCategory, isDark]);

  if (!expenseByCategory.length) {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Pengeluaran per Kategori
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Belum ada data pengeluaran untuk akun ini.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Pengeluaran per Kategori
      </h3>

      <div
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsModalOpen(true);
        }}
        aria-label="Perbesar grafik pengeluaran per kategori"
      >
        <div className="h-64 flex items-center justify-center">
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    label: (ctx) => {
                      const val = ctx.parsed as unknown as number;
                      const pct = ((val / totalExpense) * 100).toFixed(1);
                      return `${ctx.label}: Rp ${val.toLocaleString("id-ID")} (${pct}%)`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Legend & breakdown list */}
      <div className="mt-4 space-y-2">
        {expenseByCategory.map((cat, i) => {
          const pct = ((cat.total / totalExpense) * 100).toFixed(1);
          return (
            <div
              key={cat.id}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      CHART_COLORS[i % CHART_COLORS.length],
                  }}
                />
                <span className="text-slate-700 dark:text-slate-300">
                  {CATEGORY_ICONS[cat.id]}{" "}
                  {cat.name}
                </span>
              </div>
              <div className="text-right">
                <p className="font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                  Rp {cat.total.toLocaleString("id-ID")}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {pct}%
                </p>
              </div>
            </div>
          );
        })}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700 text-sm font-semibold">
          <span className="text-slate-700 dark:text-slate-300">Total</span>
          <span className="tabular-nums text-slate-900 dark:text-slate-100">
            Rp {totalExpense.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} className="max-w-lg">
          <div className="w-full p-2">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 text-center">
              Pengeluaran per Kategori
            </h3>
            <div className="h-80">
              <Doughnut
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom" as const,
                      labels: {
                        color: textColor,
                        padding: 16,
                        usePointStyle: true,
                        font: {
                          family: "'IBM Plex Sans', system-ui, sans-serif",
                        },
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: (ctx) => {
                          const val = ctx.parsed as unknown as number;
                          const pct = ((val / totalExpense) * 100).toFixed(1);
                          return `${ctx.label}: Rp ${val.toLocaleString("id-ID")} (${pct}%)`;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
