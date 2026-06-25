import { ReactNode } from "react";
import { DataUser } from "@/features/user/user.types";
import RecordsSidebar from "./RecordsSidebar";

type RecordsLayoutProps = {
  children: ReactNode;
  user: DataUser;
};

export default function RecordsLayout({
  children,
  user,
  ...rest
}: RecordsLayoutProps) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <div className="lg:flex flex-1 w-full">
        <RecordsSidebar user={user} {...rest} />
        {children}
      </div>
    </div>
  );
}
