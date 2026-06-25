"use client";

import { setRecords } from "@/features/records/records.slice";
import { selectUser } from "@/features/user/user.selector";
import { useDatabaseObserver } from "@/shared/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import RecordsLayout from "./RecordsLayout";
import RecordsView from "./RecordsView";

export default function RecordsPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);

  useDatabaseObserver("records", (data) => {
    dispatch(setRecords(data));
  });

  if (!user) return null;

  return (
    <RecordsLayout user={user}>
      <div className="w-full min-h-screen lg:ml-64 p-4 md:p-6 lg:p-8">
        <h1 className="font-semibold text-2xl md:text-3xl text-slate-900 dark:text-slate-50 mb-6">
          Table
        </h1>
        <RecordsView />
      </div>
    </RecordsLayout>
  );
}
