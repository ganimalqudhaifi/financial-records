import { Metadata } from "next";
import LandingPage from "@/features/home/landing";

export const metadata: Metadata = {
  title: "Financial Records — Catat dan pahami keuangan pribadi",
  description:
    "Aplikasi pencatatan keuangan pribadi untuk multi-akun, laporan analitik yang bersih, dan kontrol penuh atas pemasukan serta pengeluaran Anda.",
};

export default function Page() {
  return <LandingPage />;
}
