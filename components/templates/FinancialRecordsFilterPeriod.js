import { useContext } from 'react';
import { Context } from './FinancialRecords';

export default function FinancialRecordsFilterPeriod() {
  const {onFilterPeriod, state} = useContext(Context)
  const {records} = state

  const listPeriod = new Set ();
  const arrPeriod = [];

  const set = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth();
    
    listPeriod.add(year+'-'+month);
  }

  const remake = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth();
    
    const arrMonth = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
    return arrMonth[month+1] + ' ' + year;
  }
  
  const onFilterPeriodChangeEventHandler = (e) => {
    onFilterPeriod(e.target.value)
  }

  records.map((record) => set(record.tanggal))
  listPeriod.forEach (function(period) {
    arrPeriod.push(period)
  })

  return(
    <select className="h-full py-1.5 md:py-2 px-1.5 md:px-3 border border-slate-300 bg-slate-50 focus:outline-1 focus:outline-slate-800 rounded-l-lg" onChange={onFilterPeriodChangeEventHandler}>
      <option value=''>Semua Periode</option>
      {
        arrPeriod.map((period) => 
        <option key={period} value={period}>{remake(period)}</option>
        )
      }
    </select>
  );
}