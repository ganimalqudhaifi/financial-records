import Link from "next/link";
import { BiSolidWallet } from "react-icons/bi";
import { NAV_LINKS } from "./data";

const PRODUCT_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/records", label: "Catatan" },
  { href: "/demo", label: "Demo" },
];

const ACCOUNT_LINKS = [
  { href: "/login", label: "Masuk" },
  { href: "/register", label: "Daftar" },
  { href: "/profile", label: "Profil" },
];

export default function LandingFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 font-plex text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white">
                <BiSolidWallet className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold text-white">
                Financial<span className="text-blue-500">Records</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Aplikasi pencatatan keuangan pribadi yang sederhana, cepat, dan
              terorganisir. Pahami arus kas Anda dan rencanakan masa depan dengan
              lebih bijak.
            </p>
          </div>

          {/* Link columns */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-white">Navigasi</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-white">Produk</h3>
            <ul className="mt-4 space-y-2.5">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-white">Akun</h3>
            <ul className="mt-4 space-y-2.5">
              {ACCOUNT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-7 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; 2026 Financial Records. Sebuah proyek oleh{" "}
            <a
              href="https://ganimalqudhaifi.my.id"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-slate-300 transition-colors hover:text-white"
            >
              Ganim Alqudhaifi
            </a>
            .
          </p>
          <p className="text-xs text-slate-500">
            Dibuat dengan Next.js · Tailwind CSS · Firebase
          </p>
        </div>
      </div>
    </footer>
  );
}
