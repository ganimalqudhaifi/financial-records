import { useEffect, useState } from "react";
import { useAccounts, useRecords } from "../../hooks";

export default function RecordsInformation() {
  const { selectedAccount } = useAccounts();
  const { records } = useRecords();

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

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 py-2 gap-6">
      <div className="p-2 bg-white border-l-8 border-l-cyan-500 rounded">
        <div className="text-sm">Saldo Awal</div>
        <div>{`Rp ${initialBalance.toLocaleString("id-ID")}`}</div>
      </div>
      <div className="p-2 bg-white border-l-8 border-l-emerald-500 rounded">
        <div className="text-sm">Pemasukan</div>
        <div>{`Rp ${pemasukan.toLocaleString("id-ID")}`}</div>
      </div>
      <div className="p-2 bg-white border-l-8 border-l-amber-500 rounded">
        <div className="text-sm">Pengeluaran</div>
        <div>{`Rp ${pengeluaran.toLocaleString("id-ID")}`}</div>
      </div>
      <div className="p-2 bg-white border-l-8 border-l-rose-500 rounded">
        <div className="text-sm">Saldo Akhir</div>
        <div>
          {`Rp ${(initialBalance + pemasukan - pengeluaran).toLocaleString("id-ID")}`}
        </div>
      </div>
    </div>
  );
}
