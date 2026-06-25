"use client";

import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { FAQS } from "./data";
import Reveal from "./Reveal";

export default function LandingFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-slate-50 font-plex dark:bg-slate-950">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
            Pertanyaan yang sering diajukan
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = open === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <Reveal key={faq.q} delay={index * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none dark:hover:bg-slate-800/70 dark:focus-visible:bg-slate-800/70"
                  >
                    <span className="text-base font-semibold text-slate-900 dark:text-slate-50">{faq.q}</span>
                    <BiChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 dark:text-slate-400 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
