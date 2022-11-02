import {useContext} from 'react'
import { Context } from './FinancialRecords'
import FinancialRecordsTableHead from "./FinancialRecordsTableHead";
import FinancialRecordsTableBody from "./FinancialRecordsTableBody";

export default function FinancialRecordsTable() {
  const {state} = useContext(Context)
  const {records,searchKeyword,filterPeriod,saldoAwal,sliceShow,paginationIndex} = state
  let no = sliceShow*(paginationIndex-1);
  let saldoAkhir = saldoAwal;

  const redate = (date) => {
    const target = new Date(date);

    return target.getFullYear()+'-'+target.getMonth();
  }
  
  return (
    <table id="main-table">
      <FinancialRecordsTableHead/>
      <tbody>
        {
          records.filter(record => record.keterangan.toLowerCase().includes(searchKeyword)).sort((a,b) => a.id - b.id).slice((paginationIndex-1)*sliceShow, ((paginationIndex-1)*sliceShow)+sliceShow).filter(record => redate(record.tanggal).includes(filterPeriod)).map((record) => (
            <FinancialRecordsTableBody 
              key={record.id} 
              no={no=no+1}
              record={record}
              saldoAkhir={saldoAkhir = record.jenis === "Penerimaan" ? saldoAkhir+record.jumlah : saldoAkhir-record.jumlah}
            />
          ))
        }
      </tbody>
    </table>
  );
}