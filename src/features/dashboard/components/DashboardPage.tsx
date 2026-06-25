"use client";

import DashboardCategoryChart from "@/features/records/components/DashboardCategoryChart";
import DashboardMonthlyInsight from "@/features/records/components/DashboardMonthlyInsight";
import RecordsChart from "@/features/records/components/RecordsChart";
import RecordsInformation from "@/features/records/components/RecordsInformation";
import RecordsLayout from "@/features/records/components/RecordsLayout";
import { setRecords } from "@/features/records/records.slice";
import { selectUser } from "@/features/user/user.selector";
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
        <div className="w-full p-4 lg:ml-64 space-y-6">
          <h2 className="font-medium text-2xl md:text-3xl mb-4 text-slate-900 dark:text-slate-100">
            Dashboard
          </h2>

          {/* Summary Cards */}
          <RecordsInformation />

          {/* Monthly Insight Comparison */}
          <DashboardMonthlyInsight />

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecordsChart />
            <DashboardCategoryChart />
          </div>
        </div>
      </RecordsLayout>
    );
  }
}
