import {useContext} from 'react'
import { RootContext } from '../../context';
import { changePaginationIndex } from '../../context/action/demoAction';
import { Button, Text, Wrapper } from '../atoms';

export default function FinancialRecordsPaginantion() {
  const {state,dispatch} = useContext(RootContext)
  const {records,searchKeyword,sliceShow,paginationIndex,filterPeriod} = state

  const arrPagination = [];
  const entires = records.filter(record => record.keterangan.toLowerCase().includes(searchKeyword)).length;

  const valueDate = (date) => {
    const target = new Date(date);
    return target.getFullYear() + '-' + target.getMonth();
  }

  for (let i = 1; i < Math.ceil(records
    .filter(record => record.keterangan.toLowerCase().includes(searchKeyword))
    .filter(record => valueDate(record.tanggal).includes(filterPeriod))
    .length/sliceShow)+1; i++)
 {
    arrPagination.push(i);
  }

  const onSendIndex = (btnpagination) => {
    dispatch(changePaginationIndex(btnpagination))
  }

  const indexBefore = paginationIndex-2
  const indexAfter = paginationIndex+2

  return(
    <>
    <Wrapper style="pagination-field">
      <Text style="data-index-information" title={`Menampilkan ${!arrPagination.length ? 0 : (sliceShow*(paginationIndex-1))+1} sampai ${sliceShow*paginationIndex > entires ? entires : sliceShow*paginationIndex} dari ${entires} data`}/>
      <Wrapper style="pagination-list-number">
        <Button style="pagination-next-previous" title="&laquo;" onClick={() => onSendIndex(paginationIndex === 1 ? paginationIndex : paginationIndex-1)}/>
        {
          arrPagination.map((btnpagination) => ( ((btnpagination > 5 && paginationIndex <=3) || ((paginationIndex > 3 && paginationIndex <= arrPagination.length-2) && (btnpagination > indexAfter || btnpagination < indexBefore)) || (btnpagination < arrPagination.length-4 && indexAfter >= arrPagination.length))
          ? <Button style="pagination-number-hidden" title={btnpagination} id={"pgnt"+btnpagination} key={btnpagination} onClick={()=>onSendIndex(btnpagination)}/>
          : <Button style={btnpagination === paginationIndex ? "pagination-number-active" : "pagiantion-number"} title={btnpagination} id={"pgnt"+btnpagination} key={btnpagination} onClick={()=>onSendIndex(btnpagination)}/>
          ))
        }
        <Button style="pagination-next-previous"  title="&raquo;" onClick={() => onSendIndex(paginationIndex === arrPagination.length ? paginationIndex : paginationIndex+1)}/>
      </Wrapper>
    </Wrapper>
    </>
  );
}