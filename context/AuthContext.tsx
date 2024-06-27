import { onAuthStateChanged } from "firebase/auth";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "../config/firebase";
import { DataUser } from "../types";

type TAuthContext = {
  user: DataUser;
  setUser: Dispatch<SetStateAction<DataUser>>;
};

export const AuthContext = createContext<TAuthContext | null>(null);

export default function AuthContextProvider(props: PropsWithChildren) {
  const initialUserState: DataUser = {
    displayName: "",
    email: "",
    phoneNumber: "",
    photoURL: "",
    uid: "",
  };

  const [user, setUser] = useState<DataUser>(initialUserState);

  const updateUserCookie = async (
    method: "POST" | "DELETE",
    user?: DataUser,
  ) => {
    const body =
      method === "POST" ? JSON.stringify({ user: JSON.stringify(user) }) : null;
    await fetch("/api/cookie", {
      method,
      headers: { "Content-Type": "application/json" },
      body,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const dataUser = {
          displayName: user.displayName || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          photoURL: user.photoURL || "",
          uid: user.uid || "",
        };
        await updateUserCookie("POST", dataUser);
        setUser(dataUser);
      } else {
        await updateUserCookie("DELETE");
        setUser(initialUserState);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value} {...props} />;
}
