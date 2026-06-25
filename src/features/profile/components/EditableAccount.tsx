"use client";

import { ChangeEvent, KeyboardEvent, useState } from "react";
import { IoTrashOutline, IoAlertCircleOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { selectAccounts } from "@/features/account/account.selector";
import {
  firebaseDeleteAccount,
  firebaseUpdateAccount,
} from "@/features/account/account.service";
import {
  deleteAccount,
  selectAccount,
  updateAccount,
} from "@/features/account/account.slice";
import type { Account } from "@/features/account/account.types";
import { selectDemo } from "@/features/demo/demo.selector";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Modal from "@/shared/components/Modal";

type EditableAccountProps = {
  account: Account;
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function EditableAccount({ account }: EditableAccountProps) {
  const { accounts } = useAppSelector(selectAccounts);
  const { isDemo } = useAppSelector(selectDemo);
  const dispatch = useAppDispatch();

  const [isDisabled, setIsDisabled] = useState(true);
  const [inputValue, setInputValue] = useState(account.name);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDoubleClick = () => {
    setIsDisabled(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveName();
    }
  };

  const handleBlur = () => {
    saveName();
  };

  const saveName = () => {
    if (inputValue === account.name) {
      setIsDisabled(true);
      return;
    }
    const updatedAccount = { ...account, name: inputValue };
    setIsDisabled(true);
    !isDemo
      ? firebaseUpdateAccount(updatedAccount)
      : dispatch(updateAccount(updatedAccount));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDelete = () => {
    !isDemo
      ? firebaseDeleteAccount(account.id)
      : dispatch(deleteAccount(account));
    dispatch(selectAccount(accounts[0]));
  };

  if (isDisabled) {
    return (
      <div
        className="relative p-4 cursor-pointer group"
        onDoubleClick={handleDoubleClick}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
              {account.name}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Saldo awal
            </p>
            <p className="mt-0.5 text-base font-semibold text-slate-900 dark:text-slate-50 tabular-nums">
              {formatCurrency(account.initialBalance)}
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsDisabled(false);
              }}
              aria-label="Edit nama akun"
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
            >
              <FiEdit2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              aria-label="Hapus akun"
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer"
            >
              <IoTrashOutline className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <div className="text-center">
              <IoAlertCircleOutline className="mx-auto mb-4 text-amber-500 w-14 h-14" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
                Hapus Akun
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Apakah Anda yakin ingin menghapus akun{" "}
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {account.name}
                </span>
                ?
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                Semua data terkait akun ini akan dihapus secara permanen.
              </p>
              <div className="flex justify-center gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-300 dark:border-slate-700 px-6 py-3 font-semibold text-slate-700 dark:text-slate-300 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer"
                >
                  Hapus
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-1">
        <FiEdit2 className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
          Mengedit nama akun
        </span>
      </div>
      <input
        type="text"
        value={inputValue}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onChange={handleChange}
        autoFocus
        className="w-full rounded-lg border border-blue-400 dark:border-blue-500 bg-white dark:bg-slate-900 px-4 py-3 text-base text-slate-900 dark:text-slate-100 transition-colors duration-200 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        aria-label="Nama akun"
      />
      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
        Tekan Enter untuk menyimpan
      </p>
    </div>
  );
}
