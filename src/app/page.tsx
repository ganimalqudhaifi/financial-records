import { Metadata } from "next";
import LandingPage from "@/features/home/landing";

export const metadata: Metadata = {
  title: "Financial Records — Kelola Keuangan Pribadi dengan Mudah",
  description:
    "Catat pemasukan dan pengeluaran di beberapa akun sekaligus, lalu pahami arus kas Anda lewat dashboard analitik yang bersih. Gratis, cepat, dan privat.",
};

export default function Page() {
  return <LandingPage />;
}
