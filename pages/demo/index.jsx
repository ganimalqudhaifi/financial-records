import React, { useEffect } from 'react';
import Head from 'next/head';
import {
  AppLayout, FinancialRecords,
} from '../../components';
import { globalActionType, useGlobalContext } from '../../context';
import { changeSaldoAwal } from '../../context/action/demoAction';
import { getData } from '../../utils/data';

export default function Demo({ records }) {
  const { state, dispatch } = useGlobalContext();
  const { isDemo } = state;
  const user = {
    displayName: 'Demo',
    email: 'name@company.com',
  };

  useEffect(() => {
    const changeIsDemoState = (payload) => {
      dispatch({ type: globalActionType.ISDEMO, payload });
    };

    const changeRecordsState = (payload) => {
      dispatch({ type: globalActionType.GET_RECORDS, payload });
    };

    changeIsDemoState(true);
    changeRecordsState(records);
    dispatch(changeSaldoAwal(isDemo, 0));

    return () => {
      changeIsDemoState(false);
    };
  }, [dispatch, records, isDemo]);

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
