import type { Metadata } from "next";
import LoginForm from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Masuk — Financial Records",
  description:
    "Masuk ke akun Financial Records untuk mengelola keuangan Anda dengan aman dan mudah.",
};

export default function Page() {
  return <LoginForm />;
}
