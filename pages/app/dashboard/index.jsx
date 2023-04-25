import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AppLayout } from '../../../components';
import checkUID from '../../../utils/checkUID';
import FinancialRecordsInformation from '../../../components/templates/FinancialRecordsApp/FinancialRecordsInformation';
import FinancialRecordsChart from '../../../components/templates/FinancialRecordsApp/FinancialRecordsChart';
import { auth } from '../../../config/firebase';

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // login check
    const uid = checkUID();
    uid !== null ? setIsLogin(true) : router.push('/login');
  }, [router, isLogin]);

  if (isLogin) {
    return (
      <>
        <Head>
          <title>Financial Records - App Dashboard</title>
        </Head>

        <AppLayout user={auth.currentUser}>
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
