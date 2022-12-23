import FinancialRecordsActionAdd from './FinancialRecordsActionAdd';
import FinancialRecordsSlice from './FinancialRecordsSlice';
import FinancialRecordsFilterPeriod from './FinancialRecordsFilterPeriod';
import FinancialRecordsSearch from './FinancialRecordsSearch';
import FinancialRecordsTable from './FinancialRecordsTable';
import FinancialRecordsPaginantion from './FinancialRecordsPagination';
import FinancialRecordsInformation from './FinancialRecordsInformation';
import FinancialRecordsChart from './FinancialRecordsChart';
import styles from './FinancialRecords.module.css';

export default function FinancialRecords() {
  return (
    <>
      <div className="Table" />
      <div className={styles['app-table']}>
        <div className={styles['tools-app']}>
          <div>
            <FinancialRecordsActionAdd />
            <FinancialRecordsSlice />
          </div>
          <div className={styles['search-filter-field']}>
            <FinancialRecordsFilterPeriod />
            <FinancialRecordsSearch />
          </div>
        </div>
        <FinancialRecordsTable />
        <FinancialRecordsPaginantion />
      </div>
      <hr className="my-6" />
      <div className={styles['information-chart']}>
        <FinancialRecordsInformation />
        <FinancialRecordsChart />
      </div>
    </>
  );
}
