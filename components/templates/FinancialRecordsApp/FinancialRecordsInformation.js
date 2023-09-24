import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../context';

export default function FinancialRecordsInformation() {
  const { state } = useGlobalContext();
  const { records, selectedAccount } = state;

  const [initialBalance, setInitialBalance] = useState(0);
  const [penerimaan, setPenerimaan] = useState(0);
  const [pengeluaran, setPengeluaran] = useState(0);

  useEffect(() => {
    if (records.length) {
      setPenerimaan(records.filter((record) => record.accountId === selectedAccount.id).filter((record) => record.jenis === 'Penerimaan').reduce((previousValue, currentValue) => previousValue + currentValue.jumlah, 0));
      setPengeluaran(records.filter((record) => record.accountId === selectedAccount.id).filter((record) => record.jenis === 'Pengeluaran').reduce((previousValue, currentValue) => previousValue + currentValue.jumlah, 0));
    }
  }, [records, selectedAccount]);

  useEffect(() => {
    Object.keys(selectedAccount).length && setInitialBalance(selectedAccount.initialBalance);
  }, [selectedAccount]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 py-2 gap-6">
      <div className="p-2 bg-white border-l-8 border-l-cyan-500 rounded">
        <div className="text-sm">Saldo Awal</div>
        <div>
          {`Rp ${initialBalance.toLocaleString('id-ID')}`}
        </div>
      </div>
      <div className="p-2 bg-white border-l-8 border-l-emerald-500 rounded">
        <div className="text-sm">Penerimaan</div>
        <div>
          {`Rp ${penerimaan.toLocaleString('id-ID')}`}
        </div>
      </div>
      <div className="p-2 bg-white border-l-8 border-l-amber-500 rounded">
        <div className="text-sm">Pengeluaran</div>
        <div>
          {`Rp ${pengeluaran.toLocaleString('id-ID')}`}
        </div>
      </div>
      <div className="p-2 bg-white border-l-8 border-l-rose-500 rounded">
        <div className="text-sm">Saldo Akhir</div>
        <div>
          {`Rp ${(initialBalance + penerimaan - pengeluaran).toLocaleString('id-ID')}`}
        </div>
      </div>
    </div>
  );
}
