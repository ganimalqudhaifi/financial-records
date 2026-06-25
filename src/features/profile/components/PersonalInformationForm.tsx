"use client";

import { updateProfile } from "firebase/auth";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { FiSave, FiEdit2, FiUser, FiMail, FiPhone } from "react-icons/fi";
import { auth } from "@/features/auth/services/auth.client";
import type { DataUser } from "@/features/user/user.types";
import { alertToast } from "@/shared/utils";
import AvatarModal from "./AvatarModal";

interface PersonalInformationFormProps {
  user: DataUser | null;
}

type TInputs = Pick<DataUser, "displayName" | "email" | "phoneNumber">;

export default function PersonalInformationForm({
  user,
}: PersonalInformationFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [inputs, setInputs] = useState<TInputs>({
    displayName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (user) {
      setInputs({
        displayName: user.displayName ?? "",
        email: user.email ?? "",
        phoneNumber: user.phoneNumber ?? "",
      });
    }
  }, [user]);

  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile(auth.currentUser!, {
        displayName: inputs.displayName,
      });
      setIsEditing(false);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Gagal menyimpan data";
      alertToast(message);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleEdit = () => {
    if (isEditing && user) {
      // Reset inputs if cancelling
      setInputs({
        displayName: user.displayName ?? "",
        email: user.email ?? "",
        phoneNumber: user.phoneNumber ?? "",
      });
    }
    setIsEditing(!isEditing);
  };

  const fields = [
    {
      id: "displayName",
      label: "Display Name",
      type: "text",
      value: inputs.displayName || "",
      icon: FiUser,
      editable: true,
      placeholder: "Nama tampilan",
    },
    {
      id: "email",
      label: "Email Address",
      type: "text",
      value: inputs.email || "",
      icon: FiMail,
      editable: false,
      placeholder: "email@example.com",
    },
    {
      id: "phoneNumber",
      label: "Phone",
      type: "tel",
      value: inputs.phoneNumber || "-",
      icon: FiPhone,
      editable: false,
      placeholder: "-",
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Informasi Pribadi
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Kelola data profil Anda
          </p>
        </div>
        <button
          type="button"
          onClick={toggleEdit}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
          aria-label={isEditing ? "Batalkan edit" : "Edit informasi pribadi"}
        >
          {isEditing ? (
            <>
              <FiSave className="w-4 h-4" />
              Batal
            </>
          ) : (
            <>
              <FiEdit2 className="w-4 h-4" />
              Edit
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fields.map((field) => {
            const Icon = field.icon;
            const isFieldDisabled = !isEditing || !field.editable;
            return (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  onChange={handleInputs}
                  value={field.value}
                  disabled={isFieldDisabled}
                  className={`w-full rounded-lg border bg-white dark:bg-slate-900 px-4 py-3 text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 transition-all duration-200 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60 ${
                    isEditing && field.editable
                      ? "border-blue-400 dark:border-blue-500 ring-1 ring-blue-500/20"
                      : "border-slate-300 dark:border-slate-700"
                  }`}
                  aria-describedby={`${field.id}-desc`}
                />
                {!field.editable && (
                  <p
                    id={`${field.id}-desc`}
                    className="mt-1 text-xs text-slate-400 dark:text-slate-500 italic"
                  >
                    Tidak dapat diubah
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {isEditing && (
          <div className="mt-6 flex items-center gap-3 pt-5 border-t border-slate-200 dark:border-slate-700">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
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
                  Menyimpan...
                </>
              ) : (
                <>
                  <FiSave className="w-4 h-4" />
                  Simpan
                </>
              )}
            </button>
            <button
              type="button"
              onClick={toggleEdit}
              className="rounded-lg border border-slate-300 dark:border-slate-700 px-6 py-3 font-semibold text-slate-700 dark:text-slate-300 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
            >
              Batal
            </button>
          </div>
        )}
      </form>

      {isModalOpen && (
        <AvatarModal
          onClose={() => setIsModalOpen(false)}
          currentPhotoURL={user?.photoURL || ""}
        />
      )}
    </div>
  );
}
