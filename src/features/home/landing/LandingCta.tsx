"use client";

import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { selectUser } from "@/features/user/user.selector";
import { useAppSelector } from "@/store/hooks";
import Reveal from "./Reveal";

export default function LandingCta() {
  const { user } = useAppSelector(selectUser);

  return (
    <section className="bg-slate-50 font-plex dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-900 px-6 py-16 text-center shadow-2xl shadow-slate-900/20 sm:px-12 dark:border-slate-800">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-10 -top-10 h-60 w-60 rounded-full bg-blue-600/20 blur-3xl" />
              <div className="absolute -bottom-16 -right-10 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
            </div>

            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Siap mengelola keuangan pribadi dengan lebih teratur?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
                Mulai dari pencatatan sederhana sampai insight yang bisa dipakai untuk membuat keputusan
                lebih cerdas — semuanya dalam satu tempat.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={user ? "/dashboard" : "/register"}
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors duration-200 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  {user ? "Buka Dashboard" : "Mulai Gratis Sekarang"}
                  <BiRightArrowAlt className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/60 px-8 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  Lihat Demo
                </Link>
              </div>

              <p className="mt-5 text-sm text-slate-400">
                Gratis selamanya · Tanpa kartu kredit · Data tetap privat
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
