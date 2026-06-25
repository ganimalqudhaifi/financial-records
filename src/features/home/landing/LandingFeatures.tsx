"use client";

import { FEATURES } from "./data";
import Reveal from "./Reveal";

export default function LandingFeatures() {
  return (
    <section id="features" className="scroll-mt-24 bg-slate-50 font-plex dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
            Fitur
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
            Semua yang Anda butuhkan untuk mengelola keuangan pribadi
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Fokus pada pencatatan cepat, ringkasan yang mudah dipahami, dan insight yang langsung
            bisa dipakai untuk keputusan harian.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Reveal key={feature.title} delay={(index % 4) * 0.06}>
                <article className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-200 hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/40">
                  <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-300 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-slate-50">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{feature.desc}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
