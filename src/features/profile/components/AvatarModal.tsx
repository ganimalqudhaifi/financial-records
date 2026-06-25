"use client";

import { updateProfile } from "firebase/auth";
import Image from "next/image";
import React, { useState } from "react";
import { auth } from "@/features/auth/services/auth.client";
import { DataUser } from "@/features/user/user.types";
import Modal from "@/shared/components/Modal";
import { alertToast } from "@/shared/utils";

interface AvatarModalProps {
  onClose: () => void;
  currentPhotoURL?: string;
}

const avatarLists = [
  "/avatar/boy_01.svg",
  "/avatar/boy_02.svg",
  "/avatar/boy_03.svg",
  "/avatar/boy_04.svg",
  "/avatar/boy_05.svg",
  "/avatar/boy_06.svg",
  "/avatar/boy_07.svg",
  "/avatar/girl_01.svg",
  "/avatar/girl_02.svg",
  "/avatar/girl_03.svg",
  "/avatar/girl_04.svg",
  "/avatar/girl_05.svg",
  "/avatar/girl_06.svg",
  "/avatar/girl_07.svg",
];

export default function AvatarModal({
  onClose,
  currentPhotoURL,
}: AvatarModalProps) {
  const [selectedPath, setSelectedPath] = useState(currentPhotoURL || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = async (pathURL: string) => {
    setSelectedPath(pathURL);
    setIsLoading(true);
    await updateProfile(auth.currentUser!, { photoURL: pathURL })
      .then(() => {
        onClose();
      })
      .catch((error: unknown) => {
        const message =
          error instanceof Error ? error.message : "Gagal mengganti avatar";
        alertToast(message);
        onClose();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal onClose={onClose} className="max-w-lg">
      <div>
        <h3 className="text-center text-2xl font-bold tracking-wide text-slate-900 dark:text-slate-50 mb-2">
          Pilih Avatar
        </h3>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-6">
          Pilih avatar yang mewakili diri Anda
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
          {avatarLists.map((path) => {
            const isSelected = path === selectedPath;
            const isCurrent = path === currentPhotoURL;
            return (
              <button
                key={path}
                type="button"
                onClick={() => handleSelect(path)}
                disabled={isLoading}
                className={`relative aspect-square rounded-full overflow-hidden transition-all duration-200 cursor-pointer
                  ${
                    isSelected
                      ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900 scale-105"
                      : "hover:scale-105 hover:ring-2 hover:ring-blue-300 hover:ring-offset-1 dark:hover:ring-offset-slate-900"
                  }
                  ${isCurrent && !isSelected ? "ring-2 ring-green-400 ring-offset-1 dark:ring-offset-slate-900" : ""}
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                  disabled:opacity-50 disabled:cursor-wait`}
                aria-label={`Pilih avatar ${path.split("/").pop()?.replace(".svg", "") || ""}`}
              >
                <Image
                  src={path}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 20vw, 16vw"
                />
                {isCurrent && !isSelected && (
                  <div className="absolute bottom-0 inset-x-0 bg-green-500 text-white text-[9px] font-semibold text-center leading-none py-0.5">
                    Aktif
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
