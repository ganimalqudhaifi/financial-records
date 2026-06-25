"use client";

import { useState } from "react";
import RecordsLayout from "@/features/records/components/RecordsLayout";
import { useAuthContext } from "@/shared/hooks/useAuthContext";
import { useAppSelector } from "@/store/hooks";
import { selectAccounts } from "@/features/account/account.selector";
import ProfileHeader from "./ProfileHeader";
import PersonalInformationForm from "./PersonalInformationForm";
import AccountList from "./AccountList";
import PreferencesCard from "./PreferencesCard";
import AvatarModal from "./AvatarModal";

export default function ProfilePage() {
  const { user } = useAuthContext();
  const { accounts } = useAppSelector(selectAccounts);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  if (user) {
    return (
      <RecordsLayout user={user}>
        <div className="w-full p-4 sm:p-6 lg:p-8 lg:ml-64">
          {/* Page title */}
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">
              Profile
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Kelola informasi pribadi dan akun keuangan Anda
            </p>
          </div>

          {/* Content sections */}
          <div className="space-y-6">
            {/* Profile Header — hero area */}
            <ProfileHeader
              user={user}
              accounts={accounts}
              onAvatarClick={() => setIsAvatarModalOpen(true)}
            />

            {/* Personal Information */}
            <PersonalInformationForm user={user} />

            {/* Account List */}
            <AccountList />

            {/* Preferences */}
            <PreferencesCard />
          </div>

          {/* Avatar Modal triggered from header */}
          {isAvatarModalOpen && (
            <AvatarModal
              onClose={() => setIsAvatarModalOpen(false)}
              currentPhotoURL={user.photoURL || ""}
            />
          )}
        </div>
      </RecordsLayout>
    );
  }
}
