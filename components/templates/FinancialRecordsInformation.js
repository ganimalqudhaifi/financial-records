import {useContext} from 'react'
import { Context } from './FinancialRecords'

export default function FinancialRecordsInformation() {
  const {state} = useContext(Context)
  const {records,saldoAwal} = state

  const penerimaan = records.filter(record => record.jenis === "Penerimaan").reduce((previousValue, currentValue) => previousValue + currentValue.jumlah,0);
  const pengeluaran = records.filter(record => record.jenis === "Pengeluaran").reduce((previousValue, currentValue) => previousValue + currentValue.jumlah,0);
  
  return(
    <table className="border border-separate border-spacing-1 rounded mx-auto rounded-b-sm">
      <caption className="font-bold text-slate-900">Informasi Keseluruhan</caption>
      <thead>
        <tr>
          <td className="py-1 px-4 bg-slate-200 font-bold">Saldo Awal</td>
          <td className="py-1 px-4 bg-slate-100">Rp {saldoAwal.toLocaleString("id-ID")}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-1 px-4 bg-slate-200 font-bold">Penerimaan</td>
          <td className="py-1 px-4 bg-slate-100">Rp {penerimaan.toLocaleString("id-ID")}</td>
        </tr>
        <tr>
          <td className="py-1 px-4 bg-slate-200 font-bold">Pengeluaran</td>
          <td className="py-1 px-4 bg-slate-100">Rp {pengeluaran.toLocaleString("id-ID")}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td className="py-1 px-4 bg-slate-200 font-bold">Saldo Akhir</td>
          <td className="py-1 px-4 bg-slate-100">Rp {(saldoAwal+penerimaan-pengeluaran).toLocaleString("id-ID")}</td>
        </tr>
      </tfoot>
    </table>
  );
}