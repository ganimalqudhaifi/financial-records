import Head from "next/head";
import { AppLayout, RecordsChart, RecordsInformation } from "../../components";
import { useDatabaseObserver, useRecords } from "../../hooks";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function App() {
  const { setRecords } = useRecords();
  const { user } = useAuthContext();

  useDatabaseObserver("records", (data) => {
    setRecords(data);
  });

  if (user) {
    return (
      <>
        <Head>
          <title>Financial Records - App Dashboard</title>
        </Head>

        <AppLayout user={user}>
          <div className="w-full p-4 lg:ml-64">
            <h2 className="font-medium text-3xl mb-4">Dashboard</h2>
            <RecordsInformation />
            <RecordsChart />
          </div>
        </AppLayout>
      </>
    );
  }
}
