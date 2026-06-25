"use client";

import { motion } from "framer-motion";
import { BiCheck } from "react-icons/bi";
import Reveal from "./Reveal";

const GUIDE = [
  {
    title: "Tentukan tujuan keuangan",
    desc: "Mulai dari target sederhana seperti dana darurat, menabung, atau mengurangi pengeluaran yang tidak penting.",
  },
  {
    title: "Pisahkan sumber dana",
    desc: "Gunakan akun berbeda untuk dompet, tabungan, atau kartu kredit agar saldo tidak tercampur.",
  },
  {
    title: "Catat transaksi sesegera mungkin",
    desc: "Semakin dekat waktu pencatatan dengan kejadian aslinya, semakin akurat data yang Anda lihat di dashboard.",
  },
  {
    title: "Gunakan kategori yang jelas",
    desc: "Kategori yang rapi membantu Anda menemukan kebiasaan belanja yang paling sering menguras anggaran.",
  },
  {
    title: "Tinjau sebulan sekali",
    desc: "Lihat ringkasan bulanan untuk menilai apakah pengeluaran Anda masih sejalan dengan prioritas.",
  },
  {
    title: "Sesuaikan kebiasaan",
    desc: "Gunakan data historis sebagai dasar untuk memangkas biaya yang tidak perlu dan menjaga saldo tetap sehat.",
  },
];

export default function LandingGuide() {
  return (
    <section id="guide" className="scroll-mt-24 bg-slate-50 font-plex dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-28">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
                Panduan
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
                Cara sederhana menjaga anggaran pribadi tetap sehat
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                Mengelola keuangan bukan soal membatasi segalanya, tetapi memberi setiap rupiah tujuan
                yang jelas dan mudah dipantau.
              </p>
              <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-500/20 dark:bg-blue-500/10">
                <p className="text-sm leading-relaxed text-blue-900 dark:text-blue-100">
                  <span className="font-semibold">Tips cepat:</span> catat pengeluaran tepat setelah
                  transaksi terjadi. Kebiasaan ini menjaga data tetap akurat dan dashboard Anda lebih
                  berguna.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ol className="space-y-4">
            {GUIDE.map((item, index) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-200 hover:border-blue-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/40"
              >
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                  <BiCheck className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                    {index + 1}. {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
