import { useEffect } from 'react';
import Head from 'next/head';
import { AppLayout } from '../../components';
import FinancialRecordsInformation from '../../components/templates/FinancialRecordsApp/FinancialRecordsInformation';
import FinancialRecordsChart from '../../components/templates/FinancialRecordsApp/FinancialRecordsChart';
import { useGlobalContext } from '../../context/GlobalContext';
import { useAccounts, useRecords } from '../../hooks';
import { getData } from '../../utils';

const user = {
  displayName: 'Demo',
  email: 'name@company.com',
  photoURL: '/avatar/boy_01.svg',
};

const demoAccount = {
  id: 301,
  name: 'Personal',
  initialBalance: 0,
};

export default function DemoDashboard() {
  const { setIsDemo } = useGlobalContext();
  const { setAccounts } = useAccounts();
  const { setRecords, hasDemoLoadRecords, setHasDemoLoadRecords } = useRecords();

  useEffect(() => {
    setIsDemo(true);
    if (!hasDemoLoadRecords) {
      setRecords(getData());
      setHasDemoLoadRecords(true);
    }

    setAccounts([demoAccount]);

    return () => {
      setIsDemo(false);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Financial Records - Demo Dashboard</title>
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
