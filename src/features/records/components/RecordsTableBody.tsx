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

  return (
    <tr>
      <td>{no}</td>
      <td>{description}</td>
      <td>{formatDateDMY(date)}</td>
      <td>{getCategoryName(categoryId)}</td>
      <td className={`${categoryId < 200 ? "text-green-600" : "text-red-600"}`}>
        {formatCurrency(amount)}
      </td>
      <td>{formatCurrency(saldoAkhir)}</td>
      <td>
        <div className="flex items-center justify-center space-x-2 w-full">
          <RecordsActionEdit no={no} record={record} />
          <RecordsActionDelete id={id} />
        </div>
      </td>
    </tr>
  );
}
