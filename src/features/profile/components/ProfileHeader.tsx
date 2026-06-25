"use client";

import Image from "next/image";
import { FiCamera, FiLayers, FiDollarSign } from "react-icons/fi";
import type { DataUser } from "@/features/user/user.types";
import type { Account } from "@/features/account/account.types";

interface ProfileHeaderProps {
  user: DataUser;
  accounts: Account[];
  onAvatarClick: () => void;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProfileHeader({
  user,
  accounts,
  onAvatarClick,
}: ProfileHeaderProps) {
  const totalBalance = accounts.reduce(
    (sum, acc) => sum + acc.initialBalance,
    0,
  );

  const stats = [
    {
      label: "Total Akun",
      value: accounts.length,
      icon: FiLayers,
      color: "text-blue-600 dark:text-blue-400",
      border: "border-l-blue-500",
    },
    {
      label: "Total Saldo",
      value: formatCurrency(totalBalance),
      icon: FiDollarSign,
      color: "text-green-600 dark:text-green-400",
      border: "border-l-green-500",
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar section */}
        <div className="relative shrink-0">
          <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-100 dark:ring-blue-900/50">
            <Image
              src={user.photoURL || "/avatar/boy_01.svg"}
              alt={`Avatar ${user.displayName}`}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          {/* Hover overlay to change avatar */}
          <button
            type="button"
            onClick={onAvatarClick}
            aria-label="Change avatar"
            className="absolute inset-0 flex items-center justify-center w-24 h-24 rounded-full bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer group"
          >
            <span className="flex flex-col items-center gap-1 text-white">
              <FiCamera className="w-5 h-5" />
              <span className="text-[10px] font-medium leading-none">Ganti</span>
            </span>
          </button>
        </div>

        {/* Name & email */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            {user.displayName}
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {user.email}
          </p>
          {user.phoneNumber && (
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              {user.phoneNumber}
            </p>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`flex items-center gap-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 border-l-4 ${stat.border}`}
          >
            <div className={`shrink-0 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="mt-0.5 text-lg font-semibold text-slate-900 dark:text-slate-50 tabular-nums">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
