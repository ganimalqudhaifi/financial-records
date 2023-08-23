import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AppLayout, FinancialRecords } from '../../components';
import {
  database, ref, onValue, set,
} from '../../config/firebase';
import { globalActionType, useGlobalContext } from '../../context';
import checkUID from '../../utils/checkUID';

export default function App() {
  const { dispatch, state } = useGlobalContext();
  const { isDemo } = state;

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    // login check via browser storage
    const uid = checkUID();
    uid !== null ? setIsLogin(true) : router.push('/login');
    isLogin && setUser(JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user')));

    const changeSaldoAwal = (isDemo, payload) => {
      if (!isDemo) {
        set(ref(database, `users/${uid}/saldoAwal`), payload);
      }
      dispatch({ type: globalActionType.CHANGE_SALDO_AWAL, payload });
    };

    const changeRecordsState = (payload) => {
      dispatch({ type: globalActionType.GET_RECORDS, payload });
    };

    // load data records
    const recordsRef = ref(database, `users/${uid}/records`);
    onValue(recordsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.exists() && Object.keys(snapshot.val()).map((key) => ({
          ...snapshot.val()[key],
          id: key,
        }));
        data && changeRecordsState(data);
      } else {
        // localStorage.removeItem('user');
        // sessionStorage.removeItem('user');
        // setIsLogin(false);
        // router.push('/login');
      }
    });

    // load saldoAwal
    const saldoAwalRef = ref(database, `users/${uid}/saldoAwal`);
    if (!isDemo) {
      onValue(saldoAwalRef, (snapshot) => {
        const valSaldoAwal = snapshot.val();
        changeSaldoAwal(isDemo, valSaldoAwal);
      });
    }
  }, [dispatch, router, isLogin, isDemo]);

  if (isLogin) {
    return (
      <>
        <Head>
          <title>Financial Records - App</title>
        </Head>

        <AppLayout user={user}>
          <div className="w-full p-4 lg:ml-64">
            <h2 className="font-medium text-3xl mb-4">Table</h2>
            <FinancialRecords />
          </div>
        </AppLayout>
      </>
    );
  }
}
