import { useContext } from 'react';
import { RootContext } from '../../../context';
import styles from './FinancialRecordsInformation.module.css';

export default function FinancialRecordsInformation() {
  const { state } = useContext(RootContext);
  const { records, saldoAwal } = state;

  const penerimaan = records.filter((record) => record.jenis === 'Penerimaan').reduce((previousValue, currentValue) => previousValue + currentValue.jumlah, 0);
  const pengeluaran = records.filter((record) => record.jenis === 'Pengeluaran').reduce((previousValue, currentValue) => previousValue + currentValue.jumlah, 0);

  return (
    <table className={styles['information-table']}>
      <caption>Informasi Keseluruhan</caption>
      <thead>
        <tr>
          <td>Saldo Awal</td>
          <td>
            Rp
            {' '}
            {saldoAwal.toLocaleString('id-ID')}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Penerimaan</td>
          <td>
            Rp
            {' '}
            {penerimaan.toLocaleString('id-ID')}
          </td>
        </tr>
        <tr>
          <td>Pengeluaran</td>
          <td>
            Rp
            {' '}
            {pengeluaran.toLocaleString('id-ID')}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Saldo Akhir</td>
          <td>
            Rp
            {' '}
            {(saldoAwal + penerimaan - pengeluaran).toLocaleString('id-ID')}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
