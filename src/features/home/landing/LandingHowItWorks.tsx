"use client";

import Reveal from "./Reveal";
import { STEPS } from "./data";

export default function LandingHowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 bg-white font-plex dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
            Cara Kerja
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
            Mulai dalam beberapa langkah sederhana
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Alurnya singkat: buat akun, catat transaksi, lalu lihat dashboard untuk membaca pola
            keuangan Anda.
          </p>
        </Reveal>

        <ol className="relative mt-16 grid gap-5 lg:grid-cols-4">
          <div
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent lg:block dark:via-slate-700"
            aria-hidden="true"
          />
          {STEPS.map((step, index) => (
            <Reveal key={step.num} delay={index * 0.08}>
              <li className="relative h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-600/20">
                  {step.num}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-slate-50">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{step.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
