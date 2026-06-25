"use client";

import { BiSolidBank, BiTrendingDown, BiTrendingUp } from "react-icons/bi";

const MONTHS = [
  { label: "Jan", income: 62, expense: 40 },
  { label: "Feb", income: 70, expense: 52 },
  { label: "Mar", income: 55, expense: 48 },
  { label: "Apr", income: 82, expense: 58 },
  { label: "Mei", income: 74, expense: 44 },
  { label: "Jun", income: 90, expense: 61 },
];

const CATEGORIES = [
  { label: "Makanan", pct: 34, color: "bg-blue-500" },
  { label: "Transport", pct: 22, color: "bg-green-500" },
  { label: "Belanja", pct: 18, color: "bg-amber-500" },
  { label: "Hiburan", pct: 14, color: "bg-violet-500" },
  { label: "Lainnya", pct: 12, color: "bg-slate-400" },
];

const ACCOUNTS = [
  { label: "Dompet", value: "Rp 3.200.000" },
  { label: "Tabungan", value: "Rp 18.400.000" },
  { label: "Kartu Kredit", value: "Rp 2.780.000" },
];

export default function DashboardPreview() {
  return (
    <div className="w-full rounded-[2rem] border border-slate-800 bg-slate-950 p-4 shadow-2xl shadow-slate-900/40 ring-1 ring-white/5 sm:p-5">
      <div className="rounded-[1.5rem] border border-slate-800 bg-slate-900/90 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25">
              <BiSolidBank className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-medium text-slate-400">Total Saldo</p>
              <p className="mt-0.5 text-xl font-bold tabular-nums text-white sm:text-2xl">Rp 24.380.000</p>
            </div>
          </div>
          <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-[11px] font-medium text-slate-300">
            Juni 2026
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
              <BiTrendingUp className="h-3.5 w-3.5" />
              Pemasukan
            </div>
            <p className="mt-2 text-lg font-bold tabular-nums text-emerald-400">+ Rp 9.0jt</p>
          </div>
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-3">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-red-300">
              <BiTrendingDown className="h-3.5 w-3.5" />
              Pengeluaran
            </div>
            <p className="mt-2 text-lg font-bold tabular-nums text-red-400">− Rp 6.1jt</p>
          </div>
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-3">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-blue-300">Saldo Bersih</div>
            <p className="mt-2 text-lg font-bold tabular-nums text-blue-300">+ Rp 2.9jt</p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Arus Kas Bulanan</p>
              <p className="mt-1 text-sm text-slate-500">12 bulan terakhir</p>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Masuk
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-500" /> Keluar
              </span>
            </div>
          </div>

          <div className="mt-4 flex h-36 items-end gap-2 sm:h-40">
            {MONTHS.map((month) => (
              <div key={month.label} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-28 w-full items-end justify-center gap-1 sm:h-32">
                  <div className="w-1/2 rounded-t-xl bg-emerald-500/90" style={{ height: `${month.income}%` }} />
                  <div className="w-1/2 rounded-t-xl bg-red-500/80" style={{ height: `${month.expense}%` }} />
                </div>
                <span className="text-[10px] text-slate-500">{month.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Pengeluaran per Kategori</p>
            <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-slate-800">
              {CATEGORIES.map((category) => (
                <div key={category.label} className={category.color} style={{ width: `${category.pct}%` }} />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-3">
              {CATEGORIES.map((category) => (
                <div key={category.label} className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${category.color}`} />
                  <span className="text-[11px] text-slate-400">
                    {category.label} <span className="tabular-nums text-slate-200">{category.pct}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Akun Aktif</p>
            <div className="mt-3 space-y-3">
              {ACCOUNTS.map((account, index) => (
                <div key={account.label} className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2.5">
                  <div>
                    <p className="text-sm font-medium text-slate-200">{account.label}</p>
                    <p className="text-[11px] text-slate-500">Akun #{index + 1}</p>
                  </div>
                  <p className="text-sm font-semibold tabular-nums text-slate-50">{account.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
