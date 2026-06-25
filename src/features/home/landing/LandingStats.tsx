import { STATS } from "./data";
import Reveal from "./Reveal";

export default function LandingStats() {
  return (
    <section className="border-y border-slate-200 bg-slate-900 font-plex">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Reveal>
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            Dirancang untuk pencatatan yang cepat dan andal
          </p>
        </Reveal>
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center">
                <dt className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-3xl font-bold tabular-nums text-transparent sm:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-1.5 text-sm text-slate-400">{s.label}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
