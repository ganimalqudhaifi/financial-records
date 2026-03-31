import { Metadata } from "next";
import DemoDashboardPage from "@/features/demo/components/DemoDashboardPage";

export const metadata: Metadata = {
  title: "Financial Records - Demo Dashboard",
};

export default function Page() {
  return <DemoDashboardPage />;
}
