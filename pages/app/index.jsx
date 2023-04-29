import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useGlobalContext } from '../../context';
import {
  AppLayout, FinancialRecords,
} from '../../components';
import { changeSaldoAwal, setRecords } from '../../context/action/demoAction';
import {
  database, ref, onValue,
} from '../../config/firebase';
import checkUID from '../../utils/checkUID';

export default function App() {
  const { dispatch, state } = useGlobalContext();
  const { isDemo } = state;

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    // login check via browser storage
    const uid = JSON.parse(checkUID());
    uid !== null ? setIsLogin(true) : router.push('/login');
    isLogin && setUser(JSON.parse(localStorage.getItem('user')));

    // load data records
    const recordsRef = ref(database, `users/${uid}/records`);
    onValue(recordsRef, (snapshot) => {
      const data = snapshot.exists() && Object.keys(snapshot.val()).map((key) => ({
        ...snapshot.val()[key],
        id: key,
      }));
      data && dispatch(setRecords(data));
    });

    // load saldoAwal
    const saldoAwalRef = ref(database, `users/${uid}/saldoAwal`);
    if (!isDemo) {
      onValue(saldoAwalRef, (snapshot) => {
        const payload = snapshot.val();
        dispatch(changeSaldoAwal(isDemo, payload));
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
