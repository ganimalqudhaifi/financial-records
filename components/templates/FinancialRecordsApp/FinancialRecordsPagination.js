import { useGlobalContext } from '../../../context/GlobalContext';
import { useRecords } from '../../../hooks';

export default function FinancialRecordsPaginantion() {
  const { records } = useRecords();

  const { state, changePaginationIndexState } = useGlobalContext();
  const { searchKeyword, sliceShow, paginationIndex, filterPeriod } = state;

  const arrPagination = [];
  const entires = records.length && records.filter((record) => record.description.toLowerCase().includes(searchKeyword)).length;

  const valueDate = (date) => {
    const target = new Date(date);
    return `${target.getFullYear()}-${target.getMonth()}`;
  };

  for (let i = 1; i < Math.ceil(records.length && records
    .filter((record) => record.description.toLowerCase().includes(searchKeyword))
    .filter((record) => valueDate(record.tanggal).includes(filterPeriod))
    .length / sliceShow) + 1; i += 1) {
    arrPagination.push(i);
  }

  const indexBefore = paginationIndex - 2;
  const indexAfter = paginationIndex + 2;

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm">{`Menampilkan ${!arrPagination.length ? 0 : (sliceShow * (paginationIndex - 1)) + 1} sampai ${sliceShow * paginationIndex > entires ? entires : sliceShow * paginationIndex} dari ${entires} data`}</p>
      <div className="float-right text-slate-700">
        <button className="py-2 px-3 text-2xl hover:text-slate-900 hover:scale-125 active:scale-100 transition duration-150" onClick={() => changePaginationIndexState(paginationIndex === 1 ? paginationIndex : paginationIndex - 1)}>&laquo;</button>
        {
          arrPagination.map((btnpagination) => (((btnpagination > 5 && paginationIndex <= 3) || ((paginationIndex > 3 && paginationIndex <= arrPagination.length - 2) && (btnpagination > indexAfter || btnpagination < indexBefore)) || (btnpagination < arrPagination.length - 4 && indexAfter >= arrPagination.length))
            ? <button id={`pgnt${btnpagination}`} key={btnpagination} onClick={() => changePaginationIndexState(btnpagination)} className="hidden py-2 px-3">{btnpagination}</button>
            : <button id={`pgnt${btnpagination}`} key={btnpagination} onClick={() => changePaginationIndexState(btnpagination)} className={btnpagination === paginationIndex ? 'text-sm py-1.5 px-3 bg-slate-700 text-slate-100 mx-1 hover:scale-110 active:scale-100 transition duration-300 rounded' : 'text-sm py-1.5 px-3 mx-1 hover:scale-110 active:scale-100 transition duration-300 rounded'}>{btnpagination}</button>
          ))
        }
        <button className="py-2 px-3 text-2xl hover:text-slate-900 hover:scale-125 active:scale-100 transition duration-150" onClick={() => changePaginationIndexState(paginationIndex === arrPagination.length ? paginationIndex : paginationIndex + 1)}>&raquo;</button>
      </div>
    </div>
  );
}
