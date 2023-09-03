import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppLayout } from '../../../components';
import FinancialRecordsInformation from '../../../components/templates/FinancialRecordsApp/FinancialRecordsInformation';
import FinancialRecordsChart from '../../../components/templates/FinancialRecordsApp/FinancialRecordsChart';
import { useGlobalContext } from '../../../context';
import { checkUserAuth, observeRecords } from '../../../utils';

export default function App() {
  const { state, changeRecordsState, changeIsLoginState, changeUserState } = useGlobalContext();
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
          <title>Financial Records - App Dashboard</title>
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
}
