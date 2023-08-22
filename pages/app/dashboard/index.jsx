import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AppLayout } from '../../../components';
import FinancialRecordsInformation from '../../../components/templates/FinancialRecordsApp/FinancialRecordsInformation';
import FinancialRecordsChart from '../../../components/templates/FinancialRecordsApp/FinancialRecordsChart';
import { database, onValue, ref } from '../../../config/firebase';
import { globalActionType, useGlobalContext } from '../../../context';
import checkUID from '../../../utils/checkUID';

export default function App() {
  const { dispatch } = useGlobalContext();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    const changeRecordsState = (payload) => {
      dispatch({ type: globalActionType.GET_RECORDS, payload });
    };

    // login check
    const uid = checkUID();
    uid !== null ? setIsLogin(true) : router.push('/login');
    isLogin && setUser(JSON.parse(localStorage.getItem('user')));

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
