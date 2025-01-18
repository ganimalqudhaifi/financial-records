"use client";

import { PropsWithChildren, createContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  selectUser,
  selectUserFetchStatus,
} from "@/lib/redux/features/user/userSlice";
import { AppDispatch } from "@/lib/redux/store";
import { DataUser } from "@/types";

type AuthContext = {
  user: DataUser | null;
};

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthContextProvider(props: PropsWithChildren) {
  const userFetchStatus = useSelector(selectUserFetchStatus);
  const { user } = useSelector(selectUser);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (userFetchStatus === "idle") {
      dispatch(fetchUser());
    }
  }, [userFetchStatus, dispatch]);

  const value = useMemo(() => ({ user }), [user]);

  return <AuthContext.Provider value={value} {...props} />;
}
