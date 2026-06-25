"use client";

import { FiPlus, FiLayers } from "react-icons/fi";
import { selectAccounts } from "@/features/account/account.selector";
import { firebaseAddAccount } from "@/features/account/account.service";
import { addAccount } from "@/features/account/account.slice";
import { selectDemo } from "@/features/demo/demo.selector";
import EditableAccount from "@/features/profile/components/EditableAccount";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function AccountList() {
  const { accounts } = useAppSelector(selectAccounts);
  const { isDemo } = useAppSelector(selectDemo);
  const dispatch = useAppDispatch();

  const handleNewAccount = () => {
    const newAccount = {
      name: "Akun Baru",
      initialBalance: 0,
    };
    !isDemo
      ? firebaseAddAccount(newAccount)
      : dispatch(addAccount(newAccount));
  };

  const accentColors = [
    "border-l-blue-500",
    "border-l-emerald-500",
    "border-l-amber-500",
    "border-l-violet-500",
    "border-l-rose-500",
    "border-l-cyan-500",
    "border-l-orange-500",
    "border-l-teal-500",
  ];

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Akun Keuangan
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Kelola akun keuangan Anda
          </p>
        </div>
      </div>

      {accounts.length > 0 && (
        <p className="text-xs italic text-slate-400 dark:text-slate-500 mb-4">
          * klik dua kali untuk mengedit nama akun
        </p>
      )}

      {accounts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FiLayers className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Belum ada akun keuangan
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Tambahkan akun baru untuk mulai mencatat transaksi
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account, index) => (
            <div
              key={account.id}
              className={`${accentColors[index % accentColors.length]} rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50`}
            >
              <EditableAccount account={account} />
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={handleNewAccount}
          className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 transition-all duration-200 hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
        >
          <FiPlus className="w-5 h-5" />
          Tambah Akun Baru
        </button>
      </div>
    </div>
  );
}
