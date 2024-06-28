import { useRecords } from "../../hooks";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { generatePeriodYM, templateDateMY } from "../../utils";

export default function RecordsFilterPeriod() {
  const { records } = useRecords();
  const { changeFilterPeriodState } = useGlobalContext();

  const listPeriod = !records.length
    ? []
    : records.reduce<string[]>((acc, record) => {
        const period = generatePeriodYM(record.date);

        if (!acc.includes(period)) {
          acc.push(period);
        }

        return acc;
      }, []);

  return (
    <select
      className="h-full py-1.5 md:py-2 px-1.5 md:px-3 border border-slate-300 bg-slate-50 focus:outline-1 focus:outline-slate-800 rounded-l-lg"
      onChange={changeFilterPeriodState}
    >
      <option value="">Semua Periode</option>
      {listPeriod.map((period) => (
        <option key={period} value={period}>
          {templateDateMY(period)}
        </option>
      ))}
    </select>
  );
}
