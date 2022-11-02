import {useContext} from 'react'
import { Context } from './FinancialRecords'

export default function FinancialRecordsPaginantion() {
  const {state,onPagination} = useContext(Context)
  const {records,searchKeyword,sliceShow,paginationIndex} = state

  const arrPagination = [];
  const entires = records.filter(record => record.keterangan.toLowerCase().includes(searchKeyword)).length;

  for (let i = 1; i < Math.ceil(records.filter(record => record.keterangan.toLowerCase().includes(searchKeyword)).length/sliceShow)+1; i++) {
    arrPagination.push(i);
  }

  const onSendIndex = (btnpagination) => {
    onPagination(btnpagination)
  }

  const indexBefore = paginationIndex-2
  const indexAfter = paginationIndex+2

  return(
    <div className="flex items-center justify-between">
      <span className="text-sm">Menampilkan {!arrPagination.length ? 0 : (sliceShow*(paginationIndex-1))+1} sampai {sliceShow*paginationIndex > entires ? entires : sliceShow*paginationIndex} dari {entires} data</span>
      <div className="float-right text-slate-700 ">
        <button className="py-2 px-3 text-xl hover:text-slate-900 hover:scale-125 active:scale-100 transition duration-400" onClick={() => onSendIndex(paginationIndex === 1 ? paginationIndex : paginationIndex-1)}>&laquo;</button>
        {
          arrPagination.map((btnpagination) => ( ((btnpagination > 5 && paginationIndex <=3) || ((paginationIndex > 3 && paginationIndex <= arrPagination.length-2) && (btnpagination > indexAfter || btnpagination < indexBefore)) || (btnpagination < arrPagination.length-4 && indexAfter >= arrPagination.length))
          ? <button className="hidden py-2 px-3" id={"pgnt"+btnpagination} key={btnpagination} onClick={()=>onSendIndex(btnpagination)}>{btnpagination}</button>
          : <button className={btnpagination === paginationIndex ? "text-sm py-1.5 px-3 bg-slate-700 text-slate-100 mx-1 hover:scale-110 active:scale-100 transition duration-400 rounded" : "text-sm py-1.5 px-3 mx-1 hover:scale-110 active:scale-100 transition duration-400 rounded"} id={"pgnt"+btnpagination} key={btnpagination} onClick={()=>onSendIndex(btnpagination)}>{btnpagination}</button>
          ))
        }
        <button className="py-2 px-3 text-xl hover:text-slate-900 hover:scale-125 active:scale-100 transition duration-400" onClick={() => onSendIndex(paginationIndex === arrPagination.length ? paginationIndex : paginationIndex+1)}>&raquo;</button>
      </div>
    </div>
  );
}