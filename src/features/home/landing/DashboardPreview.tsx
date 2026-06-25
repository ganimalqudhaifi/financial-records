"use client";

import { BiSolidBank, BiTrendingDown, BiTrendingUp } from "react-icons/bi";

/**
 * Static, illustrative dashboard mock used in the hero.
 * Demonstrates the design system: navy surface, semantic money colors,
 * tabular numerals, and a lightweight CSS bar chart (no chart lib needed here).
 */
const BARS = [
  { m: "Jan", income: 62, expense: 40 },
  { m: "Feb", income: 70, expense: 52 },
  { m: "Mar", income: 55, expense: 48 },
  { m: "Apr", income: 82, expense: 58 },
  { m: "Mei", income: 74, expense: 44 },
  { m: "Jun", income: 90, expense: 61 },
];

const CATEGORIES = [
  { label: "Makanan", pct: 34, color: "bg-blue-600" },
  { label: "Transport", pct: 22, color: "bg-green-600" },
  { label: "Belanja", pct: 18, color: "bg-yellow-500" },
  { label: "Hiburan", pct: 14, color: "bg-violet-600" },
  { label: "Lainnya", pct: 12, color: "bg-slate-400" },
];

export default function DashboardPreview() {
  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-4 font-plex shadow-2xl shadow-slate-900/40 sm:p-5">
      {/* Top bar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600 text-white">
            <BiSolidBank className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-medium text-slate-400">Total Saldo</p>
            <p className="text-base font-bold tabular-nums text-white">Rp 24.380.000</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300">
          Juni 2026
        </span>
      </div>

      {/* KPI row */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border-l-4 border-green-500 bg-slate-800/60 p-3">
          <div className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
            <BiTrendingUp className="h-3.5 w-3.5 text-green-500" /> Pemasukan
          </div>
          <p className="mt-1 text-lg font-bold tabular-nums text-green-500">+ Rp 9.0jt</p>
        </div>
        <div className="rounded-xl border-l-4 border-red-500 bg-slate-800/60 p-3">
          <div className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
            <BiTrendingDown className="h-3.5 w-3.5 text-red-500" /> Pengeluaran
          </div>
          <p className="mt-1 text-lg font-bold tabular-nums text-red-500">− Rp 6.1jt</p>
        </div>
      </div>

      {/* Bar chart */}
      <div className="rounded-xl bg-slate-800/40 p-3.5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-200">Arus Kas Bulanan</p>
          <div className="flex items-center gap-3 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500" /> Masuk
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" /> Keluar
            </span>
          </div>
        </div>
        <div className="flex h-28 items-end justify-between gap-2">
          {BARS.map((b) => (
            <div key={b.m} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex h-24 w-full items-end justify-center gap-0.5">
                <div
                  className="w-1/2 rounded-t bg-green-500/90"
                  style={{ height: `${b.income}%` }}
                />
                <div
                  className="w-1/2 rounded-t bg-red-500/80"
                  style={{ height: `${b.expense}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500">{b.m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category breakdown */}
      <div className="mt-3 rounded-xl bg-slate-800/40 p-3.5">
        <p className="mb-2.5 text-xs font-semibold text-slate-200">Pengeluaran per Kategori</p>
        <div className="flex h-2 w-full overflow-hidden rounded-full">
          {CATEGORIES.map((c) => (
            <div key={c.label} className={c.color} style={{ width: `${c.pct}%` }} />
          ))}
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1.5 sm:grid-cols-3">
          {CATEGORIES.map((c) => (
            <div key={c.label} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${c.color}`} />
              <span className="text-[11px] text-slate-400">
                {c.label} <span className="tabular-nums text-slate-300">{c.pct}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
