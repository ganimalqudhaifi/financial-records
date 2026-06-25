import { Record } from "@/features/records/records.types";
import categories from "@/shared/data/categories.json";
import { formatDateDMY } from "@/shared/utils/templateDate";
import RecordsActionDelete from "./RecordsActionDelete";
import RecordsActionEdit from "./RecordsActionEdit";

type RecordsTableBodyProps = {
  no: number;
  record: Record;
  saldoAkhir: number;
};

const categoryMap = new Map(
  categories.map((category) => [category.id, category.name]),
);

const formatCurrency = (amount: number) =>
  `Rp ${amount.toLocaleString("id-ID")}`;

const getCategoryName = (categoryId: number) =>
  categoryMap.get(categoryId) || "Unknown";

export default function RecordsTableBody({
  no,
  record,
  saldoAkhir,
}: RecordsTableBodyProps) {
  const { id, date, description, categoryId, amount } = record;
  const isIncome = categoryId < 200;

  return (
    <tr className="text-center odd:bg-slate-50 dark:odd:bg-slate-800/30 hover:bg-blue-50 dark:hover:bg-slate-800/60 transition-colors duration-150">
      <td className="px-3 py-2.5 text-slate-500 dark:text-slate-400 text-xs">
        {no}
      </td>
      <td className="px-3 py-2.5 text-slate-900 dark:text-slate-100 whitespace-normal text-left max-w-[200px] line-clamp-2">
        {description}
      </td>
      <td className="px-3 py-2.5 text-slate-600 dark:text-slate-400 text-right text-xs tabular-nums">
        {formatDateDMY(date)}
      </td>
      <td className="px-3 py-2.5 text-slate-600 dark:text-slate-400 text-left text-xs hidden lg:table-cell">
        {getCategoryName(categoryId)}
      </td>
      <td
        className={`px-3 py-2.5 text-right font-semibold tabular-nums ${
          isIncome
            ? "text-green-600 dark:text-green-500"
            : "text-red-600 dark:text-red-500"
        }`}
      >
        {isIncome ? "+ " : "− "}
        {formatCurrency(amount)}
      </td>
      <td className="px-3 py-2.5 text-right font-medium tabular-nums text-slate-900 dark:text-slate-100">
        {formatCurrency(saldoAkhir)}
      </td>
      <td className="px-3 py-2.5">
        <div className="flex items-center justify-center gap-2">
          <RecordsActionEdit no={no} record={record} />
          <RecordsActionDelete id={id} />
        </div>
      </td>
    </tr>
  );
}
