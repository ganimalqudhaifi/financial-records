import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccounts } from "@/lib/redux/features/accounts/accountsSlice";
import { selectRecords } from "@/lib/redux/features/records/recordsSlice";
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

  return (
    <table className={styles["main-table"]}>
      <thead>
        <RecordsTableHead />
      </thead>
      {records.length ? (
        <tbody>
          {records
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .filter((record) => record.accountId === selectedAccount.id)
            .filter((record) =>
              record.description.toLowerCase().includes(searchKeyword),
            )
            .filter((record) => valueDate(record.date).includes(timeRange))
            .slice(
              (currentPage - 1) * itemsPerPage,
              (currentPage - 1) * itemsPerPage + itemsPerPage,
            )
            .map((record, i) => (
              <RecordsTableBody
                key={record.id}
                no={currentPage * itemsPerPage - itemsPerPage + i + 1}
                record={record}
                saldoAkhir={records
                  .filter((record) => record.accountId === selectedAccount.id)
                  .filter((record) =>
                    record.description.toLowerCase().includes(searchKeyword),
                  )
                  .filter((record) =>
                    valueDate(record.date).includes(timeRange),
                  )
                  .slice(0, currentPage * itemsPerPage - itemsPerPage + i + 1)
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
