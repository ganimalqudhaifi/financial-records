import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AppLayout } from '../../components';
import FinancialRecordsInformation from '../../components/templates/FinancialRecordsApp/FinancialRecordsInformation';
import FinancialRecordsChart from '../../components/templates/FinancialRecordsApp/FinancialRecordsChart';
import { useDatabaseObserver, useRecords } from '../../hooks';
import { useAuthContext } from '../../context/AuthContext';

export default function App() {
  const router = useRouter();

  const { setRecords } = useRecords();
  const { user, isLogin } = useAuthContext();

  useEffect(() => {
    if (user === null) router.push('/');
  }, []);

  useDatabaseObserver('records', (data) => {
    setRecords(data);
  });

  if (isLogin) {
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
