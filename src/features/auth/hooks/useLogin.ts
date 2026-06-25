"use client";

import { fetchUser } from "@/features/user/user.thunk";
import { useAppDispatch } from "@/store/hooks";
import { alertToast } from "@/shared/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Login gagal. Periksa email dan password Anda.");
      }

      await dispatch(fetchUser());
      router.replace("/records");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Terjadi kesalahan. Silakan coba lagi.";
      alertToast(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
}
