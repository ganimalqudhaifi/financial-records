import FinancialRecordsActionEdit from './FinancialRecordsActionEdit';
import FinancialRecordsActionDelete from './FinancialRecordsActionDelete';
import { templateDateDMY } from '../../../utils/templateDate';

export default function FinancialRecordsTableBody({ no, record, saldoAkhir }) {
  const {
    id,
    date,
    description,
    categoryId,
    amount,
  } = record;

  return (
    <tr>
      <td>{no}</td>
      <td>{description}</td>
      <td>{templateDateDMY(date)}</td>
      <td>{categoryId}</td>
      <td className={`${categoryId < 200 ? 'text-green-600' : 'text-red-600'}`}>
        {`Rp ${amount.toLocaleString('id-ID')}`}
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
