import { ChangeEvent } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useGlobalContext } from '../../context/GlobalContext';

export default function RecordsSearch() {
  const { dispatch } = useGlobalContext();

  const changeSearchState = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'HANDLE_SEARCH', payload: e.target.value });
  };

  return (
    <div className="relative inline-block">
      <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
        <IoSearchOutline className="w-5 h-5 text-gray-500" />
      </div>
      <input className="py-1.5 md:py-2 px-3 pr-10 md:w-80 text-slate-900 border-y border-r border-slate-300 bg-slate-50 rounded-r-lg focus:outline-1 focus:outline-slate-800 focus:border focus:rounded" type="text" placeholder="Cari..." onChange={changeSearchState} />
    </div>
  );
}
