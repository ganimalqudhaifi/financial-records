import { Metadata } from "next";
import DashboardPage from "@/features/dashboard/components/DashboardPage";

export const metadata: Metadata = {
  title: "Financial Records - App Dashboard",
};

export default function Page() {
  return <DashboardPage />;
}
