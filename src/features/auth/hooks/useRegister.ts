'use client'

import { fetchUser } from "@/features/user/user.slice";
import { useAppDispatch } from "@/store/hooks";
import { alertToast } from "@/utils";
import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useState } from "react";

export function useRegister() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password } = inputs;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Login Failed");
      }

      setInputs({ email: "", password: "" });
      dispatch(fetchUser());
      router.replace("/records");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      alertToast(errorMessage);
      setIsLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    inputs,
    isLoading,
    showPassword,
    handleChange,
    handleSubmit,
    togglePassword
  }
}