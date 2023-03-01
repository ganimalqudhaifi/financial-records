import FinancialRecordsActionEdit from './FinancialRecordsActionEdit';
import FinancialRecordsActionDelete from './FinancialRecordsActionDelete';
import { templateDateDMY } from '../../../utils/templateDate';

export default function FinancialRecordsTableBody({ no, record, saldoAkhir }) {
  const {
    id,
    tanggal,
    keterangan,
    jenis,
    jumlah,
  } = record;

  return (
    <tr>
      <td>{no}</td>
      <td>{keterangan}</td>
      <td>{templateDateDMY(tanggal)}</td>
      <td>{jenis}</td>
      <td className={`${jenis === 'Penerimaan' ? 'text-green-600' : 'text-red-600'}`}>
        {`Rp ${jumlah.toLocaleString('id-ID')}`}
      </td>
      <td>
        {`Rp ${saldoAkhir.toLocaleString('id-ID')}`}
      </td>
      <td>
        <div className="flex items-center justify-center space-x-2 w-full">
          <FinancialRecordsActionEdit no={no} record={record} />
          <FinancialRecordsActionDelete id={id} />
        </div>
      </td>
    </tr>
  );
}
