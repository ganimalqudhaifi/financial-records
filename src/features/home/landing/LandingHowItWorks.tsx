import { STEPS } from "./data";
import Reveal from "./Reveal";

export default function LandingHowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 bg-slate-50 font-plex">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Cara Kerja
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Mulai dalam tiga langkah mudah
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Dari daftar hingga memahami pola keuangan Anda — semuanya hanya butuh
            beberapa menit.
          </p>
        </Reveal>

        <div className="relative mt-16 grid gap-8 lg:grid-cols-3">
          {/* Connecting line (desktop) */}
          <div
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent lg:block"
            aria-hidden="true"
          />
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.12}>
              <div className="relative text-center lg:text-left">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-600/25 lg:mx-0">
                  {s.num}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
