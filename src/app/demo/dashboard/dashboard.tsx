"use client";

import Head from "next/head";
import { useEffect } from "react";
import { setAccounts } from "@/features/account/account.slice";
import {
  selectDemo,
  setHasDemoLoadRecords,
  setIsDemo,
} from "@/features/demo/demo.slice";
import { setRecords } from "@/features/record/record.slice";
import RecordsChart from "@/features/records/components/RecordsChart";
import RecordsInformation from "@/features/records/components/RecordsInformation";
import RecordsLayout from "@/features/records/components/RecordsLayout";
import { getData } from "@/shared/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

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
  const { hasDemoLoadRecords } = useAppSelector(selectDemo);
  const dispatch = useAppDispatch();

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
  }, [dispatch, hasDemoLoadRecords]);

  return (
    <>
      <Head>
        <title>Financial Records - Demo Dashboard</title>
      </Head>

      <RecordsLayout user={user}>
        <div className="w-full p-4 lg:ml-64">
          <h2 className="font-medium text-3xl mb-4">Dashboard</h2>
          <RecordsInformation />
          <RecordsChart />
        </div>
      </RecordsLayout>
    </>
  );
}
