import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { BsWallet2 } from "react-icons/bs";
import { MdAccountBalanceWallet } from "react-icons/md";
import { selectAccounts } from "@/features/account/account.selector";
import { selectRecords } from "@/features/records/records.selector";

export default function RecordsInformation() {
  const { selectedAccount } = useSelector(selectAccounts);
  const { records } = useSelector(selectRecords);

  const [initialBalance, setInitialBalance] = useState(0);
  const [pemasukan, setPenerimaan] = useState(0);
  const [pengeluaran, setPengeluaran] = useState(0);

  useEffect(() => {
    if (records.length) {
      const filteredRecords = records.filter(
        (record) => record.accountId === selectedAccount.id,
      );
      setPenerimaan(
        filteredRecords
          .filter((record) => record.categoryId < 200)
          .reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.amount,
            0,
          ),
      );
      setPengeluaran(
        filteredRecords
          .filter((record) => record.categoryId > 200)
          .reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.amount,
            0,
          ),
      );
    }
  }, [records, selectedAccount]);

  useEffect(() => {
    Object.keys(selectedAccount).length &&
      setInitialBalance(selectedAccount.initialBalance);
  }, [selectedAccount]);

  const cards = [
    {
      label: "Saldo Awal",
      value: `Rp ${initialBalance.toLocaleString("id-ID")}`,
      icon: BsWallet2,
      borderColor: "border-l-cyan-500",
      textClass: "text-cyan-600 dark:text-cyan-400",
    },
    {
      label: "Pemasukan",
      value: `Rp ${pemasukan.toLocaleString("id-ID")}`,
      icon: BiUpArrowAlt,
      borderColor: "border-l-green-500",
      textClass: "text-green-600 dark:text-green-400",
    },
    {
      label: "Pengeluaran",
      value: `Rp ${pengeluaran.toLocaleString("id-ID")}`,
      icon: BiDownArrowAlt,
      borderColor: "border-l-red-500",
      textClass: "text-red-600 dark:text-red-400",
    },
    {
      label: "Saldo Akhir",
      value: `Rp ${(initialBalance + pemasukan - pengeluaran).toLocaleString("id-ID")}`,
      icon: MdAccountBalanceWallet,
      borderColor: "border-l-blue-600 dark:border-l-blue-500",
      textClass: "text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-shadow duration-200 hover:shadow-md border-l-4 ${card.borderColor}`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {card.label}
            </span>
            <card.icon className={`w-5 h-5 ${card.textClass}`} />
          </div>
          <p className="text-lg md:text-xl font-bold tabular-nums text-slate-900 dark:text-slate-50">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
