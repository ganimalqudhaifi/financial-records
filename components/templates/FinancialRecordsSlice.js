import {useContext} from 'react';
import { Context } from './FinancialRecords';

export default function FinancialRecordsSlice() {
  const {onSlice} = useContext(Context)
  function onSliceShowChangeEventHandler(e) {
    onSlice(e.target.value)
  }
  
  return(
    <select className="py-1.5 md:py-2 px-1.5 md:px-2 lg:px-3 mx-2 border border-slate-300 bg-slate-50 focus:outline-1 focus:outline-slate-800 rounded" onChange={onSliceShowChangeEventHandler}>
      <option>10</option>
      <option>20</option>
    </select>
  );
}