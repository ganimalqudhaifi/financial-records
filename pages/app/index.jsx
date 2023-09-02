import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppLayout, FinancialRecords } from '../../components';
import { useGlobalContext } from '../../context';
import { observeRecords, observeSaldoAwal, storage } from '../../utils';

export default function App() {
  const {
    dispatch,
    state,
    changeIsLoginState,
    changeUserState,
    changeRecordsState,
    changeSaldoAwalState,
  } = useGlobalContext();
  const { isDemo, isLogin, user } = state;

  const router = useRouter();

  useEffect(() => {
    // check uid from browser storage
    const uid = storage.getUID();
    uid !== null ? changeIsLoginState(true) : router.push('/login');
    isLogin && changeUserState(storage.getItem('user'));

    observeSaldoAwal((snapshot) => {
      changeSaldoAwalState(snapshot.val());
    });

    observeRecords((snapshot) => {
      if (snapshot.exists()) {
        const data = Object.keys(snapshot.val()).map((key) => ({
          ...snapshot.val()[key],
          id: key,
        }));
        changeRecordsState(data);
      } else {
        changeRecordsState({});
      }
    });
  }, [dispatch, router, isLogin, isDemo]);

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
