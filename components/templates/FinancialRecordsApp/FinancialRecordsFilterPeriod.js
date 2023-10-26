import { useGlobalContext } from '../../../context/GlobalContext';
import { generatePeriodYM, templateDateMY } from '../../../utils';
import { useRecords } from '../../../hooks';

export default function FinancialRecordsFilterPeriod() {
  const { records } = useRecords();
  const { changeFilterPeriodState } = useGlobalContext();

  const listPeriod = !records.length ? [] : records.reduce((acc, record) => {
    const period = generatePeriodYM(record.tanggal);

    if (!acc.includes(period)) {
      acc.push(period);
    }
    return acc;
  }, []);

  return (
    <select className="h-full py-1.5 md:py-2 px-1.5 md:px-3 border border-slate-300 bg-slate-50 focus:outline-1 focus:outline-slate-800 rounded-l-lg" onChange={changeFilterPeriodState}>
      <option value="">Semua Periode</option>
      {
        listPeriod.map((period) => <option key={period} value={period}>{templateDateMY(period)}</option>)
      }
    </select>
  );
}
