"use client";

import { PropsWithChildren, createContext, useEffect, useMemo } from "react";
import {
  fetchUser,
  selectUser,
  selectUserFetchStatus,
} from "@/lib/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { DataUser } from "@/types";

type AuthContext = {
  user: DataUser | null;
};

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthContextProvider(props: PropsWithChildren) {
  const userFetchStatus = useAppSelector(selectUserFetchStatus);
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userFetchStatus === "idle") {
      dispatch(fetchUser());
    }
  }, [userFetchStatus, dispatch]);

  const value = useMemo(() => ({ user }), [user]);

  return <AuthContext.Provider value={value} {...props} />;
}
