import { useContext } from 'react';
import { RootContext } from '../../context';
import { handleSlice } from '../../context/action/demoAction';
import { Select } from '../atoms';

export default function FinancialRecordsSlice() {
  const { dispatch } = useContext(RootContext)
  function onSliceShowChangeEventHandler(e) {
    dispatch(handleSlice(e.target.value))
  }

  return (
    <>
      <Select style="slicer-pagination" onChange={onSliceShowChangeEventHandler}>
        <option>10</option>
        <option>20</option>
      </Select>
    </>
  );
}