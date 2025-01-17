import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { AppLayout, RecordsChart, RecordsInformation } from "@/components";
import { useDatabaseObserver } from "@/hooks";
import { setRecords } from "@/lib/redux/features/records/recordsSlice";
import { selectUser } from "@/lib/redux/features/user/userSlice";

export default function App() {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  useDatabaseObserver("records", (data) => {
    dispatch(setRecords(data));
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
