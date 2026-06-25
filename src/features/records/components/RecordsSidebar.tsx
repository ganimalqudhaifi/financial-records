"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Offline, Online } from "react-detect-offline";
import { BiSolidGridAlt, BiSolidUser, BiX } from "react-icons/bi";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { TbChartPieFilled, TbLogout } from "react-icons/tb";
import { setAccounts } from "@/features/account/account.slice";
import { selectDemo } from "@/features/demo/demo.selector";
import { fetchUserLogOut } from "@/features/user/user.thunk";
import { DataUser } from "@/features/user/user.types";
import { useDatabaseObserver } from "@/shared/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import AccountsDropdown from "./AccountsDropdown";

type RecordsSidebarProps = {
  user: DataUser;
};

export default function RecordsSidebar({ user }: RecordsSidebarProps) {
  const { isDemo } = useAppSelector(selectDemo);
  const dispatch = useAppDispatch();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [ctaButton, setCtaButton] = useState(false);

  const handleSignOut = () => {
    dispatch(fetchUserLogOut());
  };

  useDatabaseObserver("accounts", (data) => {
    dispatch(setAccounts(data));
  });

  const navItems = [
    {
      href: !isDemo ? "/dashboard" : "/demo/dashboard",
      label: "Dashboard",
      icon: TbChartPieFilled,
    },
    {
      href: !isDemo ? "/records" : "/demo",
      label: "Table",
      icon: BiSolidGridAlt,
    },
    {
      href: !isDemo ? "/profile" : "/demo",
      label: "Profile",
      icon: BiSolidUser,
    },
  ];

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="inline-flex items-center justify-center p-2 mt-2 ml-3 text-sm text-slate-500 rounded-lg lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
        aria-label="Open sidebar"
      >
        <HiMiniBars3BottomLeft className="w-6 h-6" />
      </button>

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden cursor-pointer"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full bg-slate-900 dark:bg-slate-950">
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-4 divide-y divide-slate-700/50">
            {/* User section */}
            <div className="flex flex-col items-center pb-4">
              <div className="relative mb-3">
                <Image
                  width={80}
                  height={80}
                  src={user.photoURL || "/avatar/boy_01.svg"}
                  alt={`Avatar ${user.displayName}`}
                  className="w-20 h-20 rounded-full grayscale-[30%] object-cover"
                />
                <Online>
                  <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full z-10" />
                  <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full animate-ping" />
                </Online>
                <Offline>
                  <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-gray-500 border-2 border-slate-900 rounded-full z-10" />
                </Offline>
              </div>
              <p className="text-white text-lg font-semibold capitalize truncate max-w-[200px]">
                {user.displayName}
              </p>
              <p className="text-slate-400 text-sm font-light truncate max-w-[200px]">
                {user.email}
              </p>
              <Link
                href="/"
                onClick={handleSignOut}
                className="flex justify-center items-center mt-4 px-5 py-2.5 w-full text-sm font-medium text-slate-300 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Logout"
              >
                <TbLogout className="mr-2 w-4 h-4 text-slate-400" />
                <span>Logout</span>
              </Link>
            </div>

            {/* Accounts */}
            <div className="pt-3">
              <AccountsDropdown />
            </div>

            {/* Navigation */}
            <ul className="pt-4 space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center px-3 py-2.5 text-sm font-normal text-slate-300 rounded-lg hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <item.icon className="w-5 h-5 text-slate-400 shrink-0" />
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Demo CTA */}
            <div
              className={`${
                isDemo ? "block" : "hidden"
              } ${ctaButton && "invisible"} mt-6 p-4 rounded-lg bg-blue-900/50 border border-blue-800`}
            >
              <div className="flex items-center mb-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-orange-200 text-orange-900">
                  Beta
                </span>
                <button
                  type="button"
                  aria-label="Close demo notice"
                  onClick={() => setCtaButton(true)}
                  className="ml-auto -mr-1 inline-flex items-center justify-center w-6 h-6 rounded-lg text-blue-400 hover:bg-blue-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
                >
                  <BiX className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-blue-300 leading-relaxed">
                Please login to use the profile features! Profile page is not
                available in demo.
              </p>
              <Link
                href="/"
                className="inline-block mt-2 text-xs font-medium text-blue-400 hover:text-blue-300 underline"
              >
                Back to Home Page
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
