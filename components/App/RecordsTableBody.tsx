import { Record } from '../../types';
import { templateDateDMY } from '../../utils/templateDate';
import RecordsActionDelete from './RecordsActionDelete';
import RecordsActionEdit from './RecordsActionEdit';

type RecordsTableBodyProps = {
  no: number,
  record: Record,
  saldoAkhir: number
}

export default function RecordsTableBody({ no, record, saldoAkhir }: RecordsTableBodyProps) {
  const {
    id,
    date,
    description,
    categoryId,
    amount,
  } = record;

  const categories = [
    { id: 101, name: 'Pendapatan' },
    { id: 201, name: 'Pengeluaran' },
    { id: 202, name: 'Tagihan Utilitas' },
    { id: 203, name: 'Makanan' },
    { id: 204, name: 'Transportasi' },
    { id: 205, name: 'Tempat Tinggal' },
    { id: 206, name: 'Hiburan' },
  ];

  const categoryName = categories.filter((category) => category.id === categoryId)[0].name;

  return (
    <tr>
      <td>{no}</td>
      <td>{description}</td>
      <td>{templateDateDMY(date)}</td>
      <td>{categoryName}</td>
      <td className={`${categoryId < 200 ? 'text-green-600' : 'text-red-600'}`}>
        {`Rp ${amount.toLocaleString('id-ID')}`}
      </td>
      <td>
        {`Rp ${saldoAkhir.toLocaleString('id-ID')}`}
      </td>
      <td>
        <div className="flex items-center justify-center space-x-2 w-full">
          <RecordsActionEdit no={no} record={record} />
          <RecordsActionDelete id={id} />
        </div>
      </td>
    </tr>
  );
}
