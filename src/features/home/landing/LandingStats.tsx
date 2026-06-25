"use client";

import { STATS } from "./data";
import Reveal from "./Reveal";

export default function LandingStats() {
  return (
    <section className="border-y border-slate-200 bg-white/90 font-plex dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
            Kecepatan dan kejelasan
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50">
            Dibangun untuk pencatatan cepat dan dashboard yang tetap responsif
          </h2>
        </Reveal>

        <dl className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <dt className="text-3xl font-bold tracking-tight tabular-nums text-slate-900 sm:text-4xl dark:text-slate-50">
                  {stat.value}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{stat.label}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
