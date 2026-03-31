import { ReactNode } from "react";
import { DataUser } from "@/shared/types";
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
    <div className="flex flex-col w-full h-full overflow-auto bg-gray-300/60">
      <div className="lg:flex flex-1 w-full">
        <RecordsSidebar user={user} {...rest} />
        {children}
      </div>
    </div>
  );
}
