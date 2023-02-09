import { useContext } from 'react';
import { RootContext } from '../../../context';
import { handleFilterPeriod } from '../../../context/action/demoAction';
import { templateDateMY } from '../../../utils/templateDate';
import { Select } from '../../atoms';

export default function FinancialRecordsFilterPeriod() {
  const { dispatch, state } = useContext(RootContext);
  const { records } = state;

  const listPeriod = new Set();

  records.map((record) => {
    const d = new Date(record.tanggal);
    const year = d.getFullYear();
    const month = d.getMonth();

    listPeriod.add(`${year}-${month}`);
  });

  const handleChange = (e) => {
    dispatch(handleFilterPeriod(e.target.value));
  };

  return (
    <Select style="filter-period" onChange={handleChange}>
      <option value="">Semua Periode</option>
      {
          [...listPeriod]
            .map((period) => <option key={period} value={period}>{templateDateMY(period)}</option>)
        }
    </Select>
  );
}
