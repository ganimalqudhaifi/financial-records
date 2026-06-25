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
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 font-plex">
      <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-300 sm:px-6 ${
            scrolled
              ? "border-slate-200/80 bg-white/85 shadow-lg shadow-slate-900/5 backdrop-blur-md"
              : "border-transparent bg-transparent"
          }`}
        >
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
              <BiSolidWallet className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold leading-tight tracking-tight text-slate-900">
              Financial<span className="text-blue-600">Records</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            {user ? (
              <Link
                href="/dashboard"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors duration-200 hover:bg-blue-700"
              >
                Buka Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-100"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors duration-200 hover:bg-blue-700"
                >
                  Daftar Gratis
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 transition-colors duration-200 hover:bg-slate-100 lg:hidden"
          >
            {open ? <BiX className="h-6 w-6" /> : <HiMiniBars3 className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl transition-all duration-300 lg:hidden ${
            open ? "mt-2 max-h-96 opacity-100" : "max-h-0 border-transparent opacity-0"
          }`}
        >
          <ul className="flex flex-col p-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-100"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-1 border-t border-slate-100 pt-2">
              {user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Buka Dashboard
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-lg border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
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
