import React, { useEffect } from 'react';
import Head from 'next/head';
import { AppSidebar, FinancialRecords, Footers } from '../../components';
import { useGlobalContext } from '../../context';
import { setRecords, isDemo } from '../../context/action/demoAction';
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

    return () => {
      dispatch(isDemo(false));
    };
  }, [dispatch, records]);

  return (
    <>
      <Head>
        <title>Financial Records - Demo</title>
      </Head>

      <div className="flex flex-col w-full h-full bg-gray-200">
        <div className="lg:flex flex-1">
          <AppSidebar user={user} />
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

export function getServerSideProps() {
  const records = getData();

  return {
    props: {
      records,
    },
  };
}
