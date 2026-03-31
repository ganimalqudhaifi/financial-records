"use client";

import { PropsWithChildren, createContext, useEffect, useMemo } from "react";
import {
  fetchUser,
  selectUser,
  selectUserFetchStatus,
} from "@/features/user/user.slice";
import { DataUser } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

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
