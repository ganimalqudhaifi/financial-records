"use client";

import { demoUser } from "@/features/demo/data/demoUser";
import useDemo from "@/features/demo/hooks/useDemo";
import RecordsLayout from "@/features/records/components/RecordsLayout";
import RecordsView from "@/features/records/components/RecordsView";

export default function DemoPage() {
  useDemo();

  return (
    <RecordsLayout user={demoUser}>
      <div className="w-full p-4 lg:ml-64">
        <h2 className="font-medium text-3xl mb-4">Table</h2>
        <RecordsView />
      </div>
    </RecordsLayout>
  );
}
