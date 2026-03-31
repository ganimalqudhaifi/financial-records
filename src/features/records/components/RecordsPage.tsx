"use client";

import { setRecords } from "@/features/record/record.slice";
import { selectUser } from "@/features/user/user.slice";
import { useDatabaseObserver } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import AppLayout from "./AppLayout";

export default function RecordsPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);

  useDatabaseObserver("records", (data) => {
    dispatch(setRecords(data));
  });

  if (user) {
    return (
      <AppLayout user={user}>
        <div className="w-full p-4 lg:ml-64">
          <h2 className="font-medium text-3xl mb-4">Table</h2>
          <RecordsPage />
        </div>
      </AppLayout>
    );
  }
}
