import Head from 'next/head';
import { AppLayout } from '../../components';
import FinancialRecordsInformation from '../../components/FinancialRecordsApp/FinancialRecordsInformation';
import FinancialRecordsChart from '../../components/FinancialRecordsApp/FinancialRecordsChart';
import { useDatabaseObserver, useRecords } from '../../hooks';
import { useAuthContext } from '../../context/AuthContext';

export default function App() {
  const { setRecords } = useRecords();
  const { user } = useAuthContext();

  useDatabaseObserver('records', (data) => {
    setRecords(data);
  });

  if (user) {
    return (
      <>
        <Head>
          <title>Financial Records - App Dashboard</title>
        </Head>

        <AppLayout user={user}>
          <div className="w-full p-4 lg:ml-64">
            <h2 className="font-medium text-3xl mb-4">Dashboard</h2>
            <FinancialRecordsInformation />
            <FinancialRecordsChart />
          </div>
        </AppLayout>
      </>
    );
  }
}
