'use client'

import { fetchUser } from "@/features/user/user.slice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        throw new Error(errorData.error || "Login Failed");
      }

      dispatch(fetchUser());
      router.replace("/app");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    }

    finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}