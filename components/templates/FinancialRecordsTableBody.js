import FinancialRecordsActionEdit from './FinancialRecordsActionEdit';
import FinancialRecordsActionDelete from './FinancialRecordsActionDelete';
import { templateDateDMY } from '../../utils/templateDate';

function FinancialRecordsTableBody({ no, record, saldoAkhir }) {
  const {
    id, tanggal, keterangan, jenis, jumlah,
  } = record;
  return (
    <tr>
      <td>{no}</td>
      <td>{keterangan}</td>
      <td>{templateDateDMY(tanggal)}</td>
      <td>{jenis}</td>
      {
        jenis === 'Penerimaan'
          ? (
            <td className="text-green-600">
              Rp
              {' '}
              {jumlah.toLocaleString('id-ID')}
            </td>
          )
          : (
            <td className="text-red-600">
              Rp
              {' '}
              {jumlah.toLocaleString('id-ID')}
            </td>
          )
      }
      <td>
        Rp
        {' '}
        {saldoAkhir.toLocaleString('id-ID')}
      </td>
      <td>
        <FinancialRecordsActionEdit
          no={no}
          record={record}
        />
        <FinancialRecordsActionDelete
          id={id}
        />
      </td>
    </tr>
  );
}

export default FinancialRecordsTableBody;
