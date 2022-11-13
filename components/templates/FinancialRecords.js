import FinancialRecordsActionAdd from './FinancialRecordsActionAdd';
import FinancialRecordsSlice from './FinancialRecordsSlice';
import FinancialRecordsFilterPeriod from './FinancialRecordsFilterPeriod';
import FinancialRecordsSearch from './FinancialRecordsSearch';
import FinancialRecordsTable from './FinancialRecordsTable';
import FinancialRecordsPaginantion from './FinancialRecordsPagination';
import FinancialRecordsInformation from './FinancialRecordsInformation';
import FinancialRecordsChart from './FinancialRecordsChart';
import Headers from '../Headers';
import Footers from '../Footers';
import { Wrapper } from '../atoms';

export default function FinancialRecords() {
  return (
    <div className="px-1 md:px-3 lg:px-20 w-fit lg:w-full h-full flex flex-col">
      <Headers />
      <Wrapper style="app-main">
        <Wrapper style="app-table">
          <Wrapper style="app-table-bar">
            <Wrapper>
              <FinancialRecordsActionAdd />
              <FinancialRecordsSlice />
            </Wrapper>
            <Wrapper style="stertch-filter-search">
              <FinancialRecordsFilterPeriod />
              <FinancialRecordsSearch />
            </Wrapper>
          </Wrapper>
          <FinancialRecordsTable />
          <FinancialRecordsPaginantion />
        </Wrapper>
        <hr className="my-6" />
        <Wrapper style="information-chart">
          <FinancialRecordsInformation />
          <FinancialRecordsChart />
        </Wrapper>
      </Wrapper>
      <Footers />
    </div>
  );
}
