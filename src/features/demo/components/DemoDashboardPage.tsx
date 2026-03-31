"use client";

import { demoUser } from "@/features/demo/data/demoUser";
import useDemo from "@/features/demo/hooks/useDemo";
import RecordsChart from "@/features/records/components/RecordsChart";
import RecordsInformation from "@/features/records/components/RecordsInformation";
import RecordsLayout from "@/features/records/components/RecordsLayout";

export default function DemoDashboardPage() {
  useDemo();

  return (
    <RecordsLayout user={demoUser}>
      <div className="w-full p-4 lg:ml-64">
        <h2 className="font-medium text-3xl mb-4">Dashboard</h2>
        <RecordsInformation />
        <RecordsChart />
      </div>
    </RecordsLayout>
  );
}
