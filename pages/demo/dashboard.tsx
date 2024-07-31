import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccounts } from "@/lib/redux/features/accounts/accountsSlice";
import {
  selectDemo,
  setHasDemoLoadRecords,
  setIsDemo,
} from "@/lib/redux/features/demo/demoSlice";
import { setRecords } from "@/lib/redux/features/records/recordsSlice";
import { AppLayout, RecordsChart, RecordsInformation } from "../../components";
import { getData } from "../../utils";

const user = {
  uid: "demouser",
  displayName: "Demo",
  email: "name@company.com",
  photoURL: "/avatar/boy_01.svg",
  phoneNumber: "",
};

const demoAccounts = [
  {
    id: "301",
    name: "Personal",
    initialBalance: 0,
  },
];

export default function DemoDashboard() {
  const { hasDemoLoadRecords } = useSelector(selectDemo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsDemo(true));
    const records = getData();
    if (!hasDemoLoadRecords) {
      dispatch(setRecords(records));
      dispatch(setHasDemoLoadRecords(true));
    }

    dispatch(setAccounts(demoAccounts));

    return () => {
      dispatch(setIsDemo(false));
    };
  }, []);

  return (
    <>
      <Head>
        <title>Financial Records - Demo Dashboard</title>
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
