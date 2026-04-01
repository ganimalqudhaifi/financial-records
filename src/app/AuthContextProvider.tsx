"use client";

import { PropsWithChildren, createContext, useEffect, useMemo } from "react";
import {
  selectUser,
  selectUserFetchStatus,
} from "@/features/user/user.selector";
import { fetchUser } from "@/features/user/user.thunk";
import { DataUser } from "@/features/user/user.types";
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
