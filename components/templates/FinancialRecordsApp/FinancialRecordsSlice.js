import { useContext } from 'react';
import { RootContext } from '../../../context';
import { handleSlice } from '../../../context/action/demoAction';

export default function FinancialRecordsSlice() {
  const { dispatch } = useContext(RootContext);
  function onSliceShowChangeEventHandler(e) {
    dispatch(handleSlice(e.target.value));
  }

  return (
    <select style="py-1.5 md:py-2 px-1.5 md:px-2 lg:px-3 mx-2 border border-slate-300 bg-slate-50 focus:outline-1 focus:outline-slate-800 rounded" onChange={onSliceShowChangeEventHandler}>
      <option>10</option>
      <option>20</option>
    </select>
  );
}
