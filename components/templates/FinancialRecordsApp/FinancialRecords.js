import FinancialRecordsActionAdd from './FinancialRecordsActionAdd';
import FinancialRecordsSlice from './FinancialRecordsSlice';
import FinancialRecordsFilterPeriod from './FinancialRecordsFilterPeriod';
import FinancialRecordsSearch from './FinancialRecordsSearch';
import FinancialRecordsTable from './FinancialRecordsTable';
import FinancialRecordsPaginantion from './FinancialRecordsPagination';
import FinancialRecordsInformation from './FinancialRecordsInformation';
import FinancialRecordsChart from './FinancialRecordsChart';
import { Footers } from '../../organisms';
import NavigationApp from '../../organisms/NavigationApp';
import styles from './FinancialRecords.module.css';

export default function FinancialRecords() {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.header}>
          <h1 className="text-3xl font-semibold my-6">Table</h1>
          <div className="flex items-center space-x-1">
            <span className="text-xl font-semibold">username</span>
            <span className={styles.icon}><ion-icon name="person-circle-outline" /></span>
          </div>
        </div>
        <div className={styles['app-main']}>
          <NavigationApp />
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
        </div>
        <Footers />
      </div>
    </>
  );
}
