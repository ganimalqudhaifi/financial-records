import Image from "next/image";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { ImStarFull } from "react-icons/im";
import { TESTIMONIALS } from "./data";
import Reveal from "./Reveal";

export default function LandingTestimonials() {
  return (
    <section className="bg-slate-50 font-plex">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Testimoni
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Dipercaya untuk merapikan keuangan harian
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <BiSolidQuoteAltLeft className="h-8 w-8 text-blue-200" />
                <div className="mt-3 flex gap-0.5" aria-label="Rating 5 dari 5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <ImStarFull key={s} className="h-4 w-4 text-yellow-500" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-slate-700">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <Image
                    src={t.avatar}
                    alt={`Foto ${t.name}`}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full bg-slate-100"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
