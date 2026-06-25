"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BiCheckCircle, BiRightArrowAlt } from "react-icons/bi";
import { selectUser } from "@/features/user/user.selector";
import { useAppSelector } from "@/store/hooks";
import DashboardPreview from "./DashboardPreview";

const HERO_POINTS = ["Gratis selamanya", "Tanpa kartu kredit", "Data privat & aman"];

export default function LandingHero() {
  const { user } = useAppSelector(selectUser);

  return (
    <section className="relative overflow-hidden font-plex">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -right-16 top-40 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(241 245 249) 1px, transparent 1px), linear-gradient(to bottom, rgb(241 245 249) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at top, black, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at top, black, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-40">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
            </span>
            Kelola keuangan pribadi, tanpa ribet
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Kendali penuh atas{" "}
            <span className="relative whitespace-nowrap text-blue-600">
              keuangan
              <svg
                className="absolute -bottom-1.5 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9c40-6 120-7 196-3"
                  stroke="#2563EB"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.35"
                />
              </svg>
            </span>{" "}
            Anda.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Financial Records membantu Anda mencatat pemasukan dan pengeluaran di
            beberapa akun sekaligus, lalu memahaminya lewat dashboard analitik
            yang bersih dan mudah dibaca.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={user ? "/dashboard" : "/register"}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              {user ? "Buka Dashboard" : "Mulai Gratis Sekarang"}
              <BiRightArrowAlt className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-800 transition-colors duration-200 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Coba Demo Langsung
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {HERO_POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <BiCheckCircle className="h-5 w-5 text-green-600" />
                {p}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-blue-600/10 to-emerald-500/10 blur-2xl" />
          <div className="animate-float-slow">
            <DashboardPreview />
          </div>

          {/* Floating chip */}
          <div className="absolute -bottom-5 -left-3 hidden rounded-xl border border-slate-200 bg-white p-3 shadow-xl sm:block">
            <p className="text-[11px] font-medium text-slate-500">Saldo Bersih</p>
            <p className="text-base font-bold tabular-nums text-green-600">+ Rp 2.900.000</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
