import FinancialRecordsTableHead from './FinancialRecordsTableHead';
import FinancialRecordsTableBody from './FinancialRecordsTableBody';
import { useGlobalContext } from '../../../context';
import styles from './FinancialRecordsTable.module.css';
import { useAccounts, useRecords } from '../../../hooks';

export default function FinancialRecordsTable() {
  const { selectedAccount } = useAccounts();
  const { records } = useRecords();
  const { state } = useGlobalContext();
  const {
    searchKeyword,
    filterPeriod,
    initialBalance,
    sliceShow,
    paginationIndex,
  } = state;

  const valueDate = (date) => {
    const target = new Date(date);
    return `${target.getFullYear()}-${target.getMonth()}`;
  };

  return (
    <table className={styles['main-table']}>
      <thead>
        <FinancialRecordsTableHead />
      </thead>
      {
        records.length
          ? (
            <tbody>
              {
                records
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .filter((record) => record.accountId === selectedAccount.id)
                  .filter((record) => record.description.toLowerCase().includes(searchKeyword))
                  .filter((record) => valueDate(record.date).includes(filterPeriod))
                  .slice((paginationIndex - 1) * sliceShow, ((paginationIndex - 1) * sliceShow) + sliceShow)
                  .map((record, i) => (
                    <FinancialRecordsTableBody
                      key={record.id}
                      no={((paginationIndex * sliceShow) - sliceShow) + i + 1}
                      record={record}
                      saldoAkhir={records
                        .filter((record) => record.accountId === selectedAccount.id)
                        .filter((record) => record.description.toLowerCase().includes(searchKeyword))
                        .filter((record) => valueDate(record.date).includes(filterPeriod))
                        .slice(0, ((paginationIndex * sliceShow) - sliceShow) + i + 1)
                        .reduce((a, b) => a + b.value, initialBalance)}
                    />
                  ))
              }
            </tbody>
          )
          : <tbody />
      }
    </table>
  );
}
