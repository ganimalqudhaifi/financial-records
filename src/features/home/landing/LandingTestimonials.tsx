import Image from "next/image";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { ImStarFull } from "react-icons/im";
import { TESTIMONIALS } from "./data";
import Reveal from "./Reveal";

export default function LandingTestimonials() {
  return (
    <section className="bg-white font-plex dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
            Testimoni
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
            Dipakai untuk merapikan keuangan harian
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <BiSolidQuoteAltLeft className="h-8 w-8 text-blue-200 dark:text-blue-500/40" />
                <div className="mt-3 flex gap-0.5" aria-label="Rating 5 dari 5">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <ImStarFull key={star} className="h-4 w-4 text-amber-500" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
                  <Image
                    src={testimonial.avatar}
                    alt={`Foto ${testimonial.name}`}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full bg-slate-100"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{testimonial.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role}</p>
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
