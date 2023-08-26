import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AppLayout } from '../../../components';
import FinancialRecordsInformation from '../../../components/templates/FinancialRecordsApp/FinancialRecordsInformation';
import FinancialRecordsChart from '../../../components/templates/FinancialRecordsApp/FinancialRecordsChart';
import { database, onValue, ref } from '../../../config/firebase';
import { useGlobalContext } from '../../../context';
import { storage } from '../../../utils';

export default function App() {
  const {
    state, dispatch, changeRecordsState, changeIsLoginState, changeUserState,
  } = useGlobalContext();
  const { isLogin, user } = state;

  const router = useRouter();

  useEffect(() => {
    // login check
    const uid = storage.getUID();
    uid !== null ? changeIsLoginState(true) : router.push('/login');
    isLogin && changeUserState(storage.getItem('user'));

    // load data records
    const recordsRef = ref(database, `users/${uid}/records`);
    onValue(recordsRef, (snapshot) => {
      const data = snapshot.exists() && Object.keys(snapshot.val()).map((key) => ({
        ...snapshot.val()[key],
        id: key,
      }));
      data && changeRecordsState(data);
    });
  }, [router, isLogin, dispatch]);

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
