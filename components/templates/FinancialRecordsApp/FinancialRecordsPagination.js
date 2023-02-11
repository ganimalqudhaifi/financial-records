import { useContext } from 'react';
import { RootContext } from '../../../context';
import { changePaginationIndex } from '../../../context/action/demoAction';
import { Text } from '../../atoms';

export default function FinancialRecordsPaginantion() {
  const { state, dispatch } = useContext(RootContext);
  const {
    records, searchKeyword, sliceShow, paginationIndex, filterPeriod,
  } = state;

  const arrPagination = [];
  const entires = records.filter((record) => record.keterangan.toLowerCase().includes(searchKeyword)).length;

  const valueDate = (date) => {
    const target = new Date(date);
    return `${target.getFullYear()}-${target.getMonth()}`;
  };

  for (let i = 1; i < Math.ceil(records
    .filter((record) => record.keterangan.toLowerCase().includes(searchKeyword))
    .filter((record) => valueDate(record.tanggal).includes(filterPeriod))
    .length / sliceShow) + 1; i += 1) {
    arrPagination.push(i);
  }

  const onSendIndex = (btnpagination) => {
    dispatch(changePaginationIndex(btnpagination));
  };

  const indexBefore = paginationIndex - 2;
  const indexAfter = paginationIndex + 2;

  return (
    <div className="flex items-center justify-between">
      <Text style="data-index-information" title={`Menampilkan ${!arrPagination.length ? 0 : (sliceShow * (paginationIndex - 1)) + 1} sampai ${sliceShow * paginationIndex > entires ? entires : sliceShow * paginationIndex} dari ${entires} data`} />
      <div className="float-right text-slate-700">
        <button className="py-2 px-3 text-2xl hover:text-slate-900 hover:scale-125 active:scale-100 transition duration-150" onClick={() => onSendIndex(paginationIndex === 1 ? paginationIndex : paginationIndex - 1)}>&laquo;</button>
        {
          arrPagination.map((btnpagination) => (((btnpagination > 5 && paginationIndex <= 3) || ((paginationIndex > 3 && paginationIndex <= arrPagination.length - 2) && (btnpagination > indexAfter || btnpagination < indexBefore)) || (btnpagination < arrPagination.length - 4 && indexAfter >= arrPagination.length))
            ? <button id={`pgnt${btnpagination}`} key={btnpagination} onClick={() => onSendIndex(btnpagination)} className="hidden py-2 px-3">{btnpagination}</button>
            : <button id={`pgnt${btnpagination}`} key={btnpagination} onClick={() => onSendIndex(btnpagination)} className={btnpagination === paginationIndex ? 'text-sm py-1.5 px-3 bg-slate-700 text-slate-100 mx-1 hover:scale-110 active:scale-100 transition duration-300 rounded' : 'text-sm py-1.5 px-3 mx-1 hover:scale-110 active:scale-100 transition duration-300 rounded'}>{btnpagination}</button>
          ))
        }
        <button className="py-2 px-3 text-2xl hover:text-slate-900 hover:scale-125 active:scale-100 transition duration-150" onClick={() => onSendIndex(paginationIndex === arrPagination.length ? paginationIndex : paginationIndex + 1)}>&raquo;</button>
      </div>
    </div>
  );
}
