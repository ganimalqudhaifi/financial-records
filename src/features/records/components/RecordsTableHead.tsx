import { SyntheticEvent, useEffect, useState } from "react";
import { selectAccounts } from "@/features/account/account.selector";
import { updateAccount } from "@/features/account/account.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Modal from "../../../shared/components/Modal";

export default function RecordsTableHead() {
  const { selectedAccount } = useAppSelector(selectAccounts);
  const dispatch = useAppDispatch();

  const [initialBalance, setInitialBalance] = useState(0);
  const [inputs, setInputs] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (Object.keys(selectedAccount).length) {
      setInputs(selectedAccount.initialBalance);
      setInitialBalance(selectedAccount.initialBalance);
    }
  }, [selectedAccount]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setInitialBalance(inputs);
    dispatch(updateAccount({ ...selectedAccount, initialBalance: inputs }));
    setIsModalOpen(false);
  };

  const headerCells = [
    { label: "No", className: "rounded-tl-lg" },
    { label: "Keterangan", className: "" },
    { label: "Tanggal", className: "" },
    { label: "Kategori", className: "hidden lg:table-cell" },
    { label: "Jumlah", className: "" },
    { label: "Saldo", className: "" },
    { label: "Action", className: "rounded-tr-lg" },
  ];

  return (
    <>
      {/* Column headers */}
      <tr className="bg-slate-800 text-slate-100 text-center">
        {headerCells.map((cell) => (
          <th
            key={cell.label}
            className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider ${
              cell.label === "Kategori" ? "hidden lg:table-cell" : ""
            } ${cell.className || ""}`}
          >
            {cell.label}
          </th>
        ))}
      </tr>
      {/* Saldo Awal row */}
      <tr className="bg-slate-100 dark:bg-slate-800/50 text-center">
        <th
          colSpan={4}
          className="px-4 py-2.5 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider"
        >
          Saldo Awal
        </th>
        <th className="px-4 py-2.5" />
        <th className="px-4 py-2.5 text-right font-semibold tabular-nums text-slate-900 dark:text-slate-100">
          Rp {initialBalance.toLocaleString("id-ID")}
        </th>
        <td className="px-4 py-2.5">
          <button
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline underline-offset-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-1 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
            aria-label="Edit saldo awal"
          >
            Edit
          </button>

          {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
              <h3 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">
                Edit Saldo Awal
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="initialBalance"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Saldo Awal
                  </label>
                  <input
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    type="number"
                    id="initialBalance"
                    name="initialBalance"
                    value={inputs}
                    placeholder="Masukkan saldo awal"
                    onChange={(e) => setInputs(parseFloat(e.target.value))}
                    inputMode="numeric"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  Ubah
                </button>
              </form>
            </Modal>
          )}
        </td>
      </tr>
    </>
  );
}
