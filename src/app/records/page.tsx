import { Metadata } from "next";
import RecordsPage from "@/features/records/components/RecordsPage";

export const metadata: Metadata = {
  title: "Financial Records - App",
};

export default function Page() {
  return <RecordsPage />;
}
