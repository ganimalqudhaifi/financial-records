import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccounts } from "@/lib/redux/features/accounts/accountsSlice";
import { selectRecords } from "@/lib/redux/features/records/recordsSlice";
import { Record } from "@/types";
import styles from "./RecordsTable.module.css";
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

  const [initialBalance, setInitialBalance] = useState(0);

  useEffect(() => {
    setInitialBalance(selectedAccount.initialBalance);
  }, [selectedAccount]);

  const valueDate = (date: Date | string) => {
    const target = new Date(date);
    return `${target.getFullYear()}-${target.getMonth()}`;
  };

  const filterRecords = (record: Record) => {
    const accountMatches = record.accountId === selectedAccount.id;
    const descriptionMatches = record.description
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
    const dateMatches = valueDate(record.date).includes(timeRange);
    return accountMatches && descriptionMatches && dateMatches;
  };

  const filteredAndSortedRecords = [...records]
    .filter(filterRecords)
    .sort((a, b) => {
      const dateComparison =
        new Date(b.date).getTime() - new Date(a.date).getTime();
      return dateComparison !== 0
        ? dateComparison
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const paginatedRecords = filteredAndSortedRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <table className={styles["main-table"]}>
      <thead>
        <RecordsTableHead />
      </thead>
      {filteredAndSortedRecords.length > 0 ? (
        <tbody>
          {paginatedRecords.map((record, i) => (
            <RecordsTableBody
              key={record.id}
              no={(currentPage - 1) * itemsPerPage + i + 1}
              record={record}
              saldoAkhir={filteredAndSortedRecords
                .slice(0, (currentPage - 1) * itemsPerPage + i + 1)
                .reduce((a, b) => a + b.value, initialBalance)}
            />
          ))}
        </tbody>
      ) : (
        <tbody />
      )}
    </table>
  );
}
