"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSolidWallet, BiX } from "react-icons/bi";
import { HiMiniBars3 } from "react-icons/hi2";
import { selectUser } from "@/features/user/user.selector";
import { useAppSelector } from "@/store/hooks";
import { NAV_LINKS } from "./data";

export default function LandingNav() {
  const { user } = useAppSelector(selectUser);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 font-plex">
      <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-6 ${
            scrolled
              ? "border-slate-200/80 bg-white/90 shadow-lg shadow-slate-900/5 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/25 ring-1 ring-white/10">
              <BiSolidWallet className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-50">
              Financial<span className="text-blue-600">Records</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 focus-visible:bg-slate-100 focus-visible:text-slate-900 focus-visible:outline-none dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus-visible:bg-slate-800"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            {user ? (
              <Link
                href="/dashboard"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors duration-200 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
              >
                Buka Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg px-4 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:outline-none dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors duration-200 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
                >
                  Daftar Gratis
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid h-11 w-11 place-items-center rounded-lg text-slate-700 transition-colors duration-200 hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:outline-none lg:hidden dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {open ? <BiX className="h-6 w-6" /> : <HiMiniBars3 className="h-6 w-6" />}
          </button>
        </nav>

        <div
          id="mobile-nav"
          className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl transition-all duration-300 lg:hidden dark:border-slate-800 dark:bg-slate-950 ${
            open ? "mt-2 max-h-[32rem] opacity-100" : "max-h-0 border-transparent opacity-0"
          }`}
        >
          <ul className="flex flex-col p-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:outline-none dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-1 border-t border-slate-100 pt-2 dark:border-slate-800">
              {user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
                >
                  Buka Dashboard
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:outline-none dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
