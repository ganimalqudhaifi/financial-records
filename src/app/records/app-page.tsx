"use client";

import Head from "next/head";
import { AppLayout, RecordsOrganism } from "@/components";
import { setRecords } from "@/features/record/record.slice";
import { selectUser } from "@/features/user/user.slice";
import { useDatabaseObserver } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function AppPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);

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
