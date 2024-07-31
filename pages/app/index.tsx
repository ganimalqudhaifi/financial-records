import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { setRecords } from "@/lib/redux/features/records/recordsSlice";
import { selectUser } from "@/lib/redux/features/user/userSlice";
import { AppLayout, RecordsOrganism } from "../../components";
import { useDatabaseObserver } from "../../hooks";

export default function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  useDatabaseObserver("records", (data) => {
    dispatch(setRecords(data));
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
            <RecordsOrganism />
          </div>
        </AppLayout>
      </>
    );
  }
}
