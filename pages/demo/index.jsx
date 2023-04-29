import React, { useEffect } from 'react';
import Head from 'next/head';
import {
  AppLayout, FinancialRecords,
} from '../../components';
import { useGlobalContext } from '../../context';
import { setRecords, isDemo, changeSaldoAwal } from '../../context/action/demoAction';
import { getData } from '../../utils/data';

export default function Demo({ records }) {
  const { dispatch } = useGlobalContext();
  const user = {
    displayName: 'Demo',
    email: 'name@company.com',
  };

  useEffect(() => {
    dispatch(isDemo(true));
    dispatch(setRecords(records));
    dispatch(changeSaldoAwal(isDemo, 0));

    return () => {
      dispatch(isDemo(false));
    };
  }, [dispatch, records]);

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
