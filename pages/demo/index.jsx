import React, { useEffect } from 'react';
import Head from 'next/head';
import { AppLayout, FinancialRecords } from '../../components';
import { database, ref, set } from '../../config/firebase';
import { globalActionType, useGlobalContext } from '../../context';
import { getData } from '../../utils/data';
import { storage } from '../../utils';

export default function Demo({ records }) {
  const { state, dispatch, changeIsDemoState } = useGlobalContext();
  const { isDemo } = state;
  const user = {
    displayName: 'Demo',
    email: 'name@company.com',
  };

  useEffect(() => {
    const uid = storage.getUID();

    const changeRecordsState = (payload) => {
      dispatch({ type: globalActionType.GET_RECORDS, payload });
    };

    const changeSaldoAwal = (isDemo, payload) => {
      if (!isDemo) {
        set(ref(database, `users/${uid}/saldoAwal`), payload);
      }
      dispatch({ type: globalActionType.CHANGE_SALDO_AWAL, payload });
    };

    changeIsDemoState(true);
    changeRecordsState(records);
    changeSaldoAwal(isDemo, 0);

    return () => {
      changeIsDemoState(false);
    };
  }, [dispatch, records, isDemo, changeIsDemoState]);

  return (
    <>
      <Head>
        <title>Financial Records - Demo</title>
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

export function getServerSideProps() {
  const records = getData();

  return {
    props: {
      records,
    },
  };
}
