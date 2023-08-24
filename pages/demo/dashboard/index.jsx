import React, { useEffect } from 'react';
import Head from 'next/head';
import { AppLayout } from '../../../components';
import FinancialRecordsInformation from '../../../components/templates/FinancialRecordsApp/FinancialRecordsInformation';
import FinancialRecordsChart from '../../../components/templates/FinancialRecordsApp/FinancialRecordsChart';
import { globalActionType, useGlobalContext } from '../../../context';
import { getData } from '../../../utils/data';

export default function App({ records }) {
  const { dispatch } = useGlobalContext();
  const user = {
    displayName: 'Demo',
    email: 'name@company.com',
  };

  useEffect(() => {
    const changeIsDemoState = (payload) => {
      dispatch({ type: globalActionType.ISDEMO, payload });
    };

    dispatch(changeIsDemoState(true));

    return () => {
      dispatch(changeIsDemoState(false));
    };
  }, [dispatch, records]);

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

export function getServerSideProps() {
  const records = getData();

  return {
    props: {
      records,
    },
  };
}
