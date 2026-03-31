import { updateProfile } from "firebase/auth";
import Image from "next/image";
import React from "react";
import { auth } from "@/features/auth/services/auth.client";
import Modal from "@/shared/components/Modal";
import { DataUser } from "@/shared/types";
import { alertToast } from "@/shared/utils";

interface AvatarModalProps {
  onClose: () => void;
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

export default function AvatarModal({ onClose }: AvatarModalProps) {
  const handleSelect = async (pathURL: string) => {
    await updateProfile(auth.currentUser!, { photoURL: pathURL })
      .then(() => {
        onClose();
      })
      .catch((error) => {
        alertToast(error.message);
        onClose();
      });
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-2">
        <h3 className="text-center text-2xl font-bold tracking-wide mb-6 mt-2">
          Chose Avatar
        </h3>
        <div className="grid grid-cols-4 lg:grid-cols-5 gap-4">
          {avatarLists.map((path) => (
            <Image
              key={path}
              src={path}
              alt="avatar"
              width={100}
              height={100}
              className="w-30 transition duration-200 grayscale-[40%] cursor-pointer hover:grayscale-0 hover:scale-105 active:scale-100"
              onClick={() => handleSelect(path)}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
}
