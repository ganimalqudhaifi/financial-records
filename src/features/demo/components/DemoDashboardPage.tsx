"use client";

import { demoUser } from "@/features/demo/data/demoUser";
import useDemo from "@/features/demo/hooks/useDemo";
import DashboardCategoryChart from "@/features/records/components/DashboardCategoryChart";
import DashboardMonthlyInsight from "@/features/records/components/DashboardMonthlyInsight";
import RecordsChart from "@/features/records/components/RecordsChart";
import RecordsInformation from "@/features/records/components/RecordsInformation";
import RecordsLayout from "@/features/records/components/RecordsLayout";

export default function DemoDashboardPage() {
  useDemo();

  return (
    <RecordsLayout user={demoUser}>
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
