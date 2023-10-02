import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppLayout, FinancialRecords } from '../../components';
import { useGlobalContext } from '../../context';
import { checkUserAuth } from '../../utils';
import { useDatabaseObserver, useRecords } from '../../hooks';

export default function App() {
  const { setRecords } = useRecords();
  const {
    state,
    changeUserState,
  } = useGlobalContext();
  const { user } = state;
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    checkUserAuth((user) => {
      if (user) {
        const { displayName, email, phoneNumber, photoURL, emailVerified, uid } = user;
        setIsLogin(true);
        changeUserState({ displayName, email, phoneNumber, photoURL, emailVerified, uid });
      } else {
        setIsLogin(false);
        router.push('/');
      }
    });
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
