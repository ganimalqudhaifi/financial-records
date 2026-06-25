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
      <div className="w-full p-4 lg:ml-64">
        <h2 className="font-medium text-3xl mb-4">Table</h2>
        <RecordsView />
      </div>
    </RecordsLayout>
  );
}
