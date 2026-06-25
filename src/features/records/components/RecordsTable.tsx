import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAccounts } from "@/features/account/account.selector";
import { selectRecords } from "@/features/records/records.selector";
import { Record } from "@/features/records/records.types";
import { generatePeriodYM } from "@/shared/utils/templateDate";
import RecordsTableBody from "./RecordsTableBody";
import RecordsTableHead from "./RecordsTableHead";

interface RecordsTableProps {
  searchKeyword: string;
  itemsPerPage: number;
  currentPage: number;
  timeRange: string;
}

export default function RecordsTable({
  searchKeyword,
  itemsPerPage,
  currentPage,
  timeRange,
}: RecordsTableProps) {
  const { records } = useSelector(selectRecords);
  const { selectedAccount } = useSelector(selectAccounts);

  const initialBalance = selectedAccount.id ? selectedAccount.initialBalance : 0;

  const filteredAndSortedRecords = useMemo(() => {
    if (records.length === 0 || !selectedAccount.id) return [];

    const filterRecords = (record: Record) => {
      const accountMatches = record.accountId === selectedAccount.id;
      const descriptionMatches = record.description
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
      const dateMatches = generatePeriodYM(record.date).includes(timeRange);

      return accountMatches && descriptionMatches && dateMatches;
    };

    return [...records].filter(filterRecords).sort((a, b) => {
      const dateComparison =
        new Date(b.date).getTime() - new Date(a.date).getTime();
      return dateComparison !== 0
        ? dateComparison
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [records, searchKeyword, selectedAccount.id, timeRange]);

  const paginatedRecords = filteredAndSortedRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <table className="w-full table-auto border-collapse whitespace-nowrap text-sm">
      <thead>
        <RecordsTableHead />
      </thead>
      <tbody>
        {filteredAndSortedRecords.length > 0 ? (
          paginatedRecords.map((record, i) => (
            <RecordsTableBody
              key={record.id}
              no={(currentPage - 1) * itemsPerPage + i + 1}
              record={record}
              saldoAkhir={filteredAndSortedRecords
                .slice(0, (currentPage - 1) * itemsPerPage + i + 1)
                .reduce((a, b) => a + b.value, initialBalance)}
            />
          ))
        ) : (
          <tr>
            <td
              colSpan={7}
              className="px-4 py-8 text-center text-slate-400 dark:text-slate-500"
            >
              No records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
