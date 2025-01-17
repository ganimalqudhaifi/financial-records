import { useSelector } from "react-redux";
import { selectRecords } from "@/lib/redux/features/records/recordsSlice";
import { generatePeriodYM, templateDateMY } from "@/utils";

interface RecordsFilterPeriodProps {
  handleTimeRange: (timeRange: string) => void;
}

export default function RecordsFilterPeriod({
  handleTimeRange,
}: RecordsFilterPeriodProps) {
  const { records } = useSelector(selectRecords);

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
      onChange={(e) => handleTimeRange(e.target.value)}
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
