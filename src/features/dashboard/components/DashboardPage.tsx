"use client";

import { setRecords } from "@/features/record/record.slice";
import RecordsChart from "@/features/records/components/RecordsChart";
import RecordsInformation from "@/features/records/components/RecordsInformation";
import RecordsLayout from "@/features/records/components/RecordsLayout";
import { selectUser } from "@/features/user/user.slice";
import { useDatabaseObserver } from "@/shared/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function DashboardPage() {
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useDatabaseObserver("records", (data) => {
    dispatch(setRecords(data));
  });

  if (user) {
    return (
      <RecordsLayout user={user}>
        <div className="w-full p-4 lg:ml-64">
          <h2 className="font-medium text-3xl mb-4">Dashboard</h2>
          <RecordsInformation />
          <RecordsChart />
        </div>
      </RecordsLayout>
    );
  }
}
