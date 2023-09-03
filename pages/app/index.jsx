import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppLayout, FinancialRecords } from '../../components';
import { useGlobalContext } from '../../context';
import { checkUserAuth, observeRecords, observeSaldoAwal } from '../../utils';

export default function App() {
  const {
    state,
    changeIsLoginState,
    changeUserState,
    changeRecordsState,
    changeSaldoAwalState,
  } = useGlobalContext();
  const { isLogin, user } = state;

  const router = useRouter();

  useEffect(() => {
    checkUserAuth((user) => {
      if (user) {
        const { displayName, email, phoneNumber, photoURL, emailVerified, uid } = user;
        changeIsLoginState(true);
        changeUserState({ displayName, email, phoneNumber, photoURL, emailVerified, uid });
      } else {
        changeIsLoginState(false);
        router.push('/');
      }
    });

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
      }
    });
  }, []);

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
