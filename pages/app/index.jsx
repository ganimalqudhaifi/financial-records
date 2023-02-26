import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { RootContext } from '../../context';
import { AppSidebar, FinancialRecords, Footers } from '../../components';
import { setRecords } from '../../context/action/demoAction';
import {
  database, ref, onValue,
} from '../../config/firebase';
import checkUID from '../../utils/checkUID';

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const { state, dispatch } = useContext(RootContext);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    // login check
    const uid = checkUID();
    uid !== null ? setIsLogin(true) : router.push('/login');

    // load data records
    const recordsRef = ref(database, `users/${JSON.parse(uid)}/records`);
    onValue(recordsRef, (snapshot) => {
      const data = snapshot.exists() && Object.keys(snapshot.val()).map((key) => ({
        ...snapshot.val()[key],
        id: key,
      }));
      data && dispatch(setRecords(data));
    });
  }, [dispatch, router, user]);

  if (isLogin) {
    return (
      <>
        <Head>
          <title>Financial Records - App</title>
        </Head>

        <div className="flex flex-col w-full h-full bg-gray-300/60">
          <div className="lg:flex flex-1">
            <AppSidebar />
            <div className="w-full p-4 lg:ml-64 overflow-auto">
              <h2 className="font-medium text-3xl mb-4">Table</h2>
              <FinancialRecords />
            </div>
          </div>
          <div className="lg:ml-64">
            <Footers />
          </div>
        </div>
      </>
    );
  }
}
