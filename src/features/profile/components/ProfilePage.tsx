"use client";

import AppLayout from "@/features/records/components/AppLayout";
import { useAuthContext } from "@/hooks/useAuthContext";
import AccountList from "./AccountList";
import PersonalInformationForm from "./PersonalInformationForm";

export default function ProfilePage() {
  const { user } = useAuthContext();

  if (user) {
    return (
      <AppLayout user={user}>
        <div className="w-full p-4 lg:ml-64">
          <h2 className="font-medium text-3xl mb-4">Profile</h2>

          <PersonalInformationForm user={user} />
          <AccountList />
        </div>
      </AppLayout>
    );
  }
}
