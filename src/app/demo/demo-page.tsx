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
import RecordsLayout from "@/features/records/components/RecordsLayout";
import RecordsView from "@/features/records/components/RecordsView";
import { getData } from "@/shared/utils/data";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const user = {
  uid: "demouser",
  displayName: "Demo",
  email: "name@company.com",
  photoURL: "/avatar/boy_01.svg",
  phoneNumber: "",
};

const demoAccount = [
  {
    id: "301",
    name: "Personal",
    initialBalance: 0,
  },
];

export default function DemoPage() {
  const { hasDemoLoadRecords } = useAppSelector(selectDemo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsDemo(true));
    const records = getData();
    if (!hasDemoLoadRecords) {
      dispatch(setRecords(records));
      dispatch(setHasDemoLoadRecords(true));
    }

    dispatch(setAccounts(demoAccount));

    return () => {
      dispatch(setIsDemo(false));
    };
  }, [dispatch, hasDemoLoadRecords]);

  return (
    <>
      <Head>
        <title>Financial Records - Demo</title>
      </Head>

      <RecordsLayout user={user}>
        <div className="w-full p-4 lg:ml-64">
          <h2 className="font-medium text-3xl mb-4">Table</h2>
          <RecordsView />
        </div>
      </RecordsLayout>
    </>
  );
}
