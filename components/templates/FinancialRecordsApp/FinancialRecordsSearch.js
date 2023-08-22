import { globalActionType, useGlobalContext } from '../../../context';

function FinancialRecordsSearch() {
  const { dispatch } = useGlobalContext();

  const changeSearchState = (e) => {
    dispatch({ type: globalActionType.HANDLE_SEARCH, payload: e.target.value });
  };

  return (
    <div className="relative inline-block">
      <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>
      <input className="py-1.5 md:py-2 px-3 pr-10 md:w-80 text-slate-900 border-y border-r border-slate-300 bg-slate-50 rounded-r-lg focus:outline-1 focus:outline-slate-800 focus:border focus:rounded" type="text" placeholder="Cari..." onChange={changeSearchState} />
    </div>
  );
}

export default FinancialRecordsSearch;
