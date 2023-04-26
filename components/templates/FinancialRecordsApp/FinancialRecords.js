import FinancialRecordsActionAdd from './FinancialRecordsActionAdd';
import FinancialRecordsSlice from './FinancialRecordsSlice';
import FinancialRecordsFilterPeriod from './FinancialRecordsFilterPeriod';
import FinancialRecordsSearch from './FinancialRecordsSearch';
import FinancialRecordsTable from './FinancialRecordsTable';
import FinancialRecordsPaginantion from './FinancialRecordsPagination';

export default function FinancialRecords() {
  return (
    <div className="w-full min-w-fit bg-gray-50/90 p-4 rounded">
      <div className="flex justify-between min-w-max flex-wrap px-0.5 mb-1">
        <div className="space-x-2">
          <span>
            <FinancialRecordsActionAdd />
          </span>
          <FinancialRecordsSlice />
        </div>
        <div className="flex items-stretch">
          <FinancialRecordsFilterPeriod />
          <FinancialRecordsSearch />
        </div>
      </div>
      <FinancialRecordsTable />
      <FinancialRecordsPaginantion />
    </div>
  );
}
