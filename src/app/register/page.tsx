import type { Metadata } from "next";
import RegisterForm from "@/features/auth/components/registerForm";

export const metadata: Metadata = {
  title: "Daftar — Financial Records",
  description:
    "Buat akun Financial Records baru dan mulai catat keuangan Anda dengan mudah.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
