import { useSelector } from "react-redux";
import { selectRecords } from "@/features/records/records.selector";
import { formatDateMY, generatePeriodYM } from "@/shared/utils";

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
      className="h-full rounded-l-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-300 transition-colors duration-200 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
      onChange={(e) => handleTimeRange(e.target.value)}
      aria-label="Filter periode"
    >
      <option value="">Semua Periode</option>
      {listPeriod.map((period) => (
        <option key={period} value={period}>
          {formatDateMY(period)}
        </option>
      ))}
    </select>
  );
}
