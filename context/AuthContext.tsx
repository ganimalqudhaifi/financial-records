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

type AuthContext = {
  user: DataUser | null;
  setUser: Dispatch<SetStateAction<DataUser | null>>;
};

export const AuthContext = createContext<AuthContext | null>(null);

const initialUserState: DataUser = {
  displayName: "",
  email: "",
  phoneNumber: "",
  photoURL: "",
  uid: "",
};

export default function AuthContextProvider(props: PropsWithChildren) {
  const [user, setUser] = useState<DataUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Alternate API for retrieving user data
        // const res = await fetch("/api/user");
        // const userRecord = await res.json();

        const dataUser: DataUser = {
          displayName: user.displayName || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          photoURL: user.photoURL || "",
          uid: user.uid || "-",
        };

        setUser(dataUser);
      } else {
        setUser(initialUserState);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value} {...props} />;
}
