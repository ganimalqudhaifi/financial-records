import { useGlobalContext } from '../../../context';
import { templateDateMY } from '../../../utils/templateDate';

export default function FinancialRecordsFilterPeriod() {
  const { state, changeFilterPeriodState } = useGlobalContext();
  const { records } = state;

  const listPeriod = new Set();

  records.map((record) => {
    const d = new Date(record.tanggal);
    const year = d.getFullYear();
    const month = d.getMonth();

    listPeriod.add(`${year}-${month}`);
  });

  return (
    <select className="h-full py-1.5 md:py-2 px-1.5 md:px-3 border border-slate-300 bg-slate-50 focus:outline-1 focus:outline-slate-800 rounded-l-lg" onChange={changeFilterPeriodState}>
      <option value="">Semua Periode</option>
      {
        [...listPeriod]
          .map((period) => <option key={period} value={period}>{templateDateMY(period)}</option>)
      }
    </select>
  );
}
