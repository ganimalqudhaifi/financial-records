import { Metadata } from "next";
import DemoPage from "@/features/demo/components/DemoPage";

export const metadata: Metadata = {
  title: "Financial Records - Demo",
};

export default function Page() {
  return <DemoPage />;
}
