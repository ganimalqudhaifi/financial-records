import { useContext } from 'react';
import { RootContext } from '../../context';
import { handleSearch } from '../../context/action/demoAction';
import { Input, Wrapper } from '../atoms';

function FinancialRecordsSearch() {
  const { dispatch } = useContext(RootContext);

  const onSearchChangeEventHandler = (e) => {
    dispatch(handleSearch(e.target.value));
  };

  return (
    <>
      <Wrapper style="search-field">
        <Wrapper style="search-icon">
          <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </Wrapper>
        <Input style="search-field" type="text" placeholder="Cari..." onChange={onSearchChangeEventHandler} />
      </Wrapper>
    </>
  );
}

export default FinancialRecordsSearch;
