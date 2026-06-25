"use client";

import { motion } from "framer-motion";
import { BiCheck } from "react-icons/bi";
import Reveal from "./Reveal";

// Condensed from the original Budgeting Guide (PRD-aligned personal-budgeting steps).
const GUIDE = [
  {
    title: "Pahami Tujuan Keuangan Anda",
    desc: "Tentukan tujuan — menabung, melunasi utang, atau dana darurat — agar anggaran Anda punya arah yang jelas.",
  },
  {
    title: "Identifikasi Sumber Pendapatan",
    desc: "Catat seluruh pemasukan: gaji, bonus, hasil investasi, hingga penghasilan sampingan.",
  },
  {
    title: "Rincikan Pengeluaran Anda",
    desc: "Pisahkan pengeluaran ke dalam kategori agar Anda tahu persis ke mana uang Anda pergi setiap bulan.",
  },
  {
    title: "Prioritaskan & Sesuaikan",
    desc: "Utamakan kebutuhan penting, lalu tinjau anggaran secara berkala dan sesuaikan saat keadaan berubah.",
  },
  {
    title: "Pantau Secara Berkala",
    desc: "Tinjau ringkasan setidaknya sebulan sekali. Financial Records memantau anggaran Anda secara otomatis.",
  },
  {
    title: "Disiplin & Konsisten",
    desc: "Komitmen mengikuti rencana adalah fondasi pengelolaan keuangan yang sukses dalam jangka panjang.",
  },
];

export default function LandingGuide() {
  return (
    <section id="guide" className="scroll-mt-24 bg-white font-plex">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-28">
        {/* Sticky intro */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Panduan
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Panduan singkat membuat anggaran pribadi
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Personal budgeting bukan soal membatasi diri, melainkan memastikan
                setiap rupiah bekerja menuju tujuan Anda. Ikuti langkah-langkah
                praktis ini untuk mulai mengelola keuangan secara lebih
                terorganisir dan efektif.
              </p>
              <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-sm leading-relaxed text-blue-900">
                  <span className="font-semibold">Tips:</span> Catat transaksi
                  sesegera mungkin setelah terjadi. Kebiasaan kecil ini membuat
                  data Anda akurat dan dashboard jadi benar-benar berguna.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Steps */}
        <div className="lg:col-span-7">
          <ol className="space-y-4">
            {GUIDE.map((g, i) => (
              <motion.li
                key={g.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-200 hover:border-blue-200"
              >
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green-100 text-green-700">
                  <BiCheck className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {i + 1}. {g.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{g.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
