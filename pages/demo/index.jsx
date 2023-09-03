import { useEffect } from 'react';
import Head from 'next/head';
import { AppLayout, FinancialRecords } from '../../components';
import { useGlobalContext } from '../../context';
import { getData } from '../../utils/data';

export default function Demo({ records }) {
  const { state, changeIsDemoState, changeRecordsState, changeSaldoAwalState } = useGlobalContext();
  const { isDemo } = state;
  const user = {
    displayName: 'Demo',
    email: 'name@company.com',
  };

  useEffect(() => {
    changeIsDemoState(true);
    changeRecordsState(records);
    changeSaldoAwalState(0);

    return () => {
      changeIsDemoState(false);
    };
  }, [records, isDemo]);

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

  return { props: { records } };
}
