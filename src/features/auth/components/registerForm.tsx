"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { IoEye, IoEyeOff, IoLockClosed, IoMail, IoArrowForward } from "react-icons/io5";
import { alertToast } from "@/shared/utils";
import { useAppDispatch } from "@/store/hooks";
import { fetchUser } from "@/features/user/user.thunk";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  /* ── Validators ── */
  const validateEmail = (email: string) => {
    if (!email.trim()) return "Email wajib diisi";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Format email tidak valid";
    return undefined;
  };

  const validatePassword = (password: string) => {
    if (!password) return "Password wajib diisi";
    if (password.length < 6) return "Password minimal 6 karakter";
    return undefined;
  };

  const validateConfirm = (confirm: string) => {
    if (!confirm) return "Konfirmasi password wajib diisi";
    if (confirm !== inputs.password) return "Password tidak cocok";
    return undefined;
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
        break;
      case "password":
        setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
        /* re-check confirmPassword if already typed */
        if (inputs.confirmPassword) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: validateConfirm(inputs.confirmPassword),
          }));
        }
        break;
      case "confirmPassword":
        setErrors((prev) => ({ ...prev, confirmPassword: validateConfirm(value) }));
        break;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    const emailError = validateEmail(inputs.email);
    const passwordError = validatePassword(inputs.password);
    const confirmError = validateConfirm(inputs.confirmPassword);
    setErrors({ email: emailError, password: passwordError, confirmPassword: confirmError });

    if (emailError || passwordError || confirmError) return;

    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inputs.email, password: inputs.password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Pendaftaran gagal");
      }

      setInputs({ email: "", password: "", confirmPassword: "" });
      await dispatch(fetchUser());
      router.replace("/records");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Terjadi kesalahan";
      alertToast(msg);
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Shared input classes ── */
  const inputBase = (hasError?: boolean) =>
    `block w-full rounded-lg border py-2.5 pl-11 pr-3.5 text-sm text-slate-900 transition-colors duration-200 placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 ${
      hasError
        ? "border-red-500 dark:border-red-400"
        : "border-slate-300 dark:border-slate-700"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 font-plex">
      <div className="w-full max-w-md">
        {/* ── Brand header ── */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Financial Records
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Buat akun baru
          </p>
        </div>

        {/* ── Auth card ── */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="reg-email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 dark:text-slate-500">
                  <IoMail className="h-5 w-5" />
                </div>
                <input
                  id="reg-email"
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="contoh@email.com"
                  autoComplete="email"
                  className={inputBase(!!errors.email)}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-5">
              <label
                htmlFor="reg-password"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 dark:text-slate-500">
                  <IoLockClosed className="h-5 w-5" />
                </div>
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Minimal 6 karakter"
                  autoComplete="new-password"
                  minLength={6}
                  className={`${inputBase(!!errors.password)} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition-colors duration-200 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? (
                    <IoEyeOff className="h-5 w-5" />
                  ) : (
                    <IoEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label
                htmlFor="reg-confirm"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Konfirmasi Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 dark:text-slate-500">
                  <IoLockClosed className="h-5 w-5" />
                </div>
                <input
                  id="reg-confirm"
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={inputs.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ulangi password"
                  autoComplete="new-password"
                  minLength={6}
                  className={`${inputBase(!!errors.confirmPassword)} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition-colors duration-200 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                  aria-label={showConfirm ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showConfirm ? (
                    <IoEyeOff className="h-5 w-5" />
                  ) : (
                    <IoEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Memproses...
                </>
              ) : (
                <>
                  Daftar
                  <IoArrowForward className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* ── Login link ── */}
        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
