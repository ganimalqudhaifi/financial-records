import { useContext } from 'react';
import FinancialRecordsTableHead from './FinancialRecordsTableHead';
import FinancialRecordsTableBody from './FinancialRecordsTableBody';
import { RootContext } from '../../../context';
import styles from './FinancialRecordsTable.module.css';

export default function FinancialRecordsTable() {
  const { state } = useContext(RootContext);
  const {
    records, searchKeyword, filterPeriod, saldoAwal, sliceShow, paginationIndex,
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
      <tbody>
        {
            records
              .filter((record) => record.keterangan.toLowerCase().includes(searchKeyword))
              .filter((record) => valueDate(record.tanggal).includes(filterPeriod))
              .slice((paginationIndex - 1) * sliceShow, ((paginationIndex - 1) * sliceShow) + sliceShow)
              .sort((a, b) => a.tanggal - b.tanggal)
              .map((record, i) => (
                <FinancialRecordsTableBody
                  key={record.id}
                  no={((paginationIndex * sliceShow) - sliceShow) + i + 1}
                  record={record}
                  saldoAkhir={records
                    .filter((record) => record.keterangan.toLowerCase().includes(searchKeyword))
                    .filter((record) => valueDate(record.tanggal).includes(filterPeriod))
                    .slice(0, ((paginationIndex * sliceShow) - sliceShow) + i + 1)
                    .reduce((a, b) => a + (b.jenis === 'Penerimaan' ? b.jumlah : (b.jumlah * -1)), saldoAwal)}
                />
              ))
          }
      </tbody>
    </table>
  );
}
