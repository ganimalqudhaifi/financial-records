import RecordsActionAdd from './RecordsActionAdd';
import RecordsSlice from './RecordsSlice';
import RecordsSearch from './RecordsSearch';
import RecordsTable from './RecordsTable';
import RecordsPaginantion from './RecordsPagination';
import RecordsFilterPeriod from './RecordsFilterPeriod';

export default function RecordsOrganism() {
  return (
    <div className="w-full min-w-fit bg-gray-50/90 p-4 rounded">
      <div className="flex justify-between min-w-max flex-wrap px-0.5 mb-1">
        <div className="space-x-2">
          <span>
            <RecordsActionAdd />
          </span>
          <RecordsSlice />
        </div>
        <div className="flex items-stretch">
          <RecordsFilterPeriod />
          <RecordsSearch />
        </div>
      </div>
      <RecordsTable />
      <RecordsPaginantion />
    </div>
  );
}
