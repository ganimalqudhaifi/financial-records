import { Metadata } from "next";
import ProfilePage from "@/features/profile/components/ProfilePage";

export const metadata: Metadata = {
  title: "Financial Records - App Profile",
};
export default function Page() {
  return <ProfilePage />;
}
