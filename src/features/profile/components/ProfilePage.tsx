"use client";

import RecordsLayout from "@/features/records/components/RecordsLayout";
import { useAuthContext } from "@/shared/hooks/useAuthContext";
import AccountList from "./AccountList";
import PersonalInformationForm from "./PersonalInformationForm";

export default function ProfilePage() {
  const { user } = useAuthContext();

  if (user) {
    return (
      <RecordsLayout user={user}>
        <div className="w-full p-4 lg:ml-64">
          <h2 className="font-medium text-3xl mb-4">Profile</h2>

          <PersonalInformationForm user={user} />
          <AccountList />
        </div>
      </RecordsLayout>
    );
  }
}
