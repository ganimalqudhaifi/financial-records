"use client";

import Head from "next/head";
import { AppLayout, RecordsChart, RecordsInformation } from "@/components";
import { useDatabaseObserver } from "@/hooks";
import { setRecords } from "@/lib/redux/features/records/recordsSlice";
import { selectUser } from "@/lib/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

export default function AppDashboardPage() {
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

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
