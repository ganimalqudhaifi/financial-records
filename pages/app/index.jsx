import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AppLayout, FinancialRecords } from '../../components';
import { useAuthContext } from '../../context';
import { useDatabaseObserver, useRecords } from '../../hooks';

export default function App() {
  const router = useRouter();

  const { setRecords } = useRecords();
  const { user, isLogin } = useAuthContext();

  useEffect(() => {
    if (!isLogin) router.push('/');
  }, []);

  useDatabaseObserver('records', (data) => {
    setRecords(data);
  });

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
