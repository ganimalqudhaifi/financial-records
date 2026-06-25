"use client";

import Link from "next/link";
import { BiCheckCircle, BiRightArrowAlt } from "react-icons/bi";
import { selectUser } from "@/features/user/user.selector";
import { useAppSelector } from "@/store/hooks";
import DashboardPreview from "./DashboardPreview";

const HERO_POINTS = ["Multi-akun dalam satu tempat", "Grafik mudah dibaca", "Privat dan responsif"];

export default function LandingHero() {
  const { user } = useAppSelector(selectUser);

  return (
    <section className="relative isolate overflow-hidden font-plex">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.08),transparent_24%)] dark:bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.20),transparent_38%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.12),transparent_24%)]" />
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(226 232 240) 1px, transparent 1px), linear-gradient(to bottom, rgb(226 232 240) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at top, black, transparent 72%)",
            WebkitMaskImage: "radial-gradient(ellipse at top, black, transparent 72%)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pb-24 lg:pt-40">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 shadow-sm dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300">
            Keuangan pribadi yang lebih rapi
          </span>

          <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-50">
            Catat transaksi lebih cepat, pahami arus kas dengan lebih jelas.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Financial Records membantu Anda memisahkan akun, mencatat pemasukan dan pengeluaran,
            lalu melihat ringkasan analitik yang bersih untuk mengambil keputusan keuangan dengan
            lebih percaya diri.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={user ? "/dashboard" : "/register"}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors duration-200 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
            >
              {user ? "Buka Dashboard" : "Mulai Gratis Sekarang"}
              <BiRightArrowAlt className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-800 transition-colors duration-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
            >
              Lihat Demo Interaktif
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {HERO_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                <BiCheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-blue-600/10 via-transparent to-emerald-500/10 blur-2xl dark:from-blue-500/15 dark:to-emerald-500/10" />
          <div className="animate-float-slow">
            <DashboardPreview />
          </div>

          <div className="absolute -bottom-5 -left-2 hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/10 sm:block dark:border-slate-800 dark:bg-slate-900">
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Saldo Bersih Bulan Ini</p>
            <p className="text-base font-bold tabular-nums text-green-600 dark:text-green-500">+ Rp 2.900.000</p>
          </div>
        </div>
      </div>
    </section>
  );
}
