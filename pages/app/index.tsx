import Head from 'next/head';

import { AppLayout, FinancialRecords } from '../../components';
import { useAuthContext } from '../../context/AuthContext';
import { useDatabaseObserver, useRecords } from '../../hooks';

export default function App() {
  const { setRecords } = useRecords();
  const { user } = useAuthContext();

  // TODO!: Typescript definition for callback required later
  useDatabaseObserver('records', (data) => {
    setRecords(data);
  });

  if (user) {
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
