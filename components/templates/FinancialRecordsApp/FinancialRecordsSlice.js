import { globalActionType, useGlobalContext } from '../../../context';

export default function FinancialRecordsSlice() {
  const { dispatch } = useGlobalContext();

  const changeSliceState = (e) => {
    dispatch({ type: globalActionType.HANDLE_SLICE, payload: e.target.value });
  };

  return (
    <select className="py-1.5 md:py-2 px-1.5 md:px-2 lg:px-3 border border-slate-300 bg-slate-50 focus:outline-1 focus:outline-slate-800 rounded" onChange={changeSliceState}>
      <option>10</option>
      <option>20</option>
    </select>
  );
}
