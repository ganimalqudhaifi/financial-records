"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BsArrowDownRight,
  BsArrowUpRight,
  BsGraphUp,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectAccounts } from "@/features/account/account.selector";
import { selectRecords } from "@/features/records/records.selector";
import { generatePeriodYM } from "@/shared/utils/templateDate";

export default function DashboardMonthlyInsight() {
  const { selectedAccount } = useSelector(selectAccounts);
  const { records } = useSelector(selectRecords);

  const monthlyData = useMemo(() => {
    if (!records.length || !selectedAccount.id) return null;

    const filtered = records.filter(
      (r) => r.accountId === selectedAccount.id,
    );

    const now = new Date();
    const thisMonthKey = generatePeriodYM(now);

    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthKey = generatePeriodYM(prevMonth);

    const calcNet = (key: string) => {
      const monthRecords = filtered.filter(
        (r) => generatePeriodYM(r.date) === key,
      );
      const income = monthRecords
        .filter((r) => r.categoryId < 200)
        .reduce((s, r) => s + r.amount, 0);
      const expense = monthRecords
        .filter((r) => r.categoryId > 200)
        .reduce((s, r) => s + r.amount, 0);
      return { income, expense, net: income - expense };
    };

    const thisMonth = calcNet(thisMonthKey);
    const prevMonthData = calcNet(prevMonthKey);

    return { thisMonth, prevMonth: prevMonthData, thisMonthKey, prevMonthKey };
  }, [records, selectedAccount.id]);

  const now = new Date();
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Ags", "Sep", "Okt", "Nov", "Des",
  ];
  const thisMonthLabel = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
  const prevMonthLabel =
    now.getMonth() === 0
      ? `${monthNames[11]} ${now.getFullYear() - 1}`
      : `${monthNames[now.getMonth() - 1]} ${now.getFullYear()}`;

  if (!monthlyData) {
    return null;
  }

  const { thisMonth, prevMonth } = monthlyData;

  const netChange = prevMonth.net !== 0
    ? ((thisMonth.net - prevMonth.net) / Math.abs(prevMonth.net)) * 100
    : thisMonth.net !== 0
      ? 100
      : 0;

  const incomeChange =
    prevMonth.income !== 0
      ? ((thisMonth.income - prevMonth.income) / prevMonth.income) * 100
      : thisMonth.income !== 0
        ? 100
        : 0;

  const expenseChange =
    prevMonth.expense !== 0
      ? ((thisMonth.expense - prevMonth.expense) / prevMonth.expense) * 100
      : thisMonth.expense !== 0
        ? 100
        : 0;

  const formatPercent = (val: number) => {
    const sign = val > 0 ? "+" : "";
    return `${sign}${val.toFixed(1)}%`;
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
        <BsGraphUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        Perbandingan Bulanan
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Net Cash Flow */}
        <div className="rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Arus Kas Bersih
          </p>
          <p className="text-lg font-bold tabular-nums text-slate-900 dark:text-slate-100">
            Rp {thisMonth.net.toLocaleString("id-ID")}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {netChange >= 0 ? (
              <BsArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
            ) : (
              <BsArrowDownRight className="w-4 h-4 text-red-600 dark:text-red-400" />
            )}
            <span
              className={`text-sm font-medium tabular-nums ${
                netChange >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {formatPercent(netChange)}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              vs {prevMonthLabel}
            </span>
          </div>
        </div>

        {/* Income */}
        <div className="rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Pemasukan
          </p>
          <p className="text-base font-bold tabular-nums text-green-600 dark:text-green-400">
            Rp {thisMonth.income.toLocaleString("id-ID")}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {incomeChange >= 0 ? (
              <BsArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
            ) : (
              <BsArrowDownRight className="w-4 h-4 text-red-600 dark:text-red-400" />
            )}
            <span
              className={`text-sm font-medium tabular-nums ${
                incomeChange >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {formatPercent(incomeChange)}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              vs {prevMonthLabel}
            </span>
          </div>
        </div>

        {/* Expense */}
        <div className="rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Pengeluaran
          </p>
          <p className="text-base font-bold tabular-nums text-red-600 dark:text-red-400">
            Rp {thisMonth.expense.toLocaleString("id-ID")}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {/* For expense, "down" is good */}
            {expenseChange <= 0 ? (
              <BsArrowDownRight className="w-4 h-4 text-green-600 dark:text-green-400" />
            ) : (
              <BsArrowUpRight className="w-4 h-4 text-red-600 dark:text-red-400" />
            )}
            <span
              className={`text-sm font-medium tabular-nums ${
                expenseChange <= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {formatPercent(expenseChange)}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              vs {prevMonthLabel}
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 text-center">
        {thisMonthLabel} vs {prevMonthLabel}
      </p>
    </div>
  );
}
