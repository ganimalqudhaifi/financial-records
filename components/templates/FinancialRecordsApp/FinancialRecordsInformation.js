import { useContext } from 'react';
import { RootContext } from '../../../context';

export default function FinancialRecordsInformation() {
  const { state } = useContext(RootContext);
  const { records, saldoAwal } = state;

  const penerimaan = records.filter((record) => record.jenis === 'Penerimaan').reduce((previousValue, currentValue) => previousValue + currentValue.jumlah, 0);
  const pengeluaran = records.filter((record) => record.jenis === 'Pengeluaran').reduce((previousValue, currentValue) => previousValue + currentValue.jumlah, 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 py-2 gap-6">
      <div className="p-2 bg-white border-l-8 border-l-cyan-500 rounded">
        <div className="text-sm">Saldo Awal</div>
        <div>
          {`Rp ${saldoAwal.toLocaleString('id-ID')}`}
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
          {`Rp ${(saldoAwal + penerimaan - pengeluaran).toLocaleString('id-ID')}`}
        </div>
      </div>
    </div>
  );
}
