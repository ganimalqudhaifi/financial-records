import { auth } from "../config/firebase";
import { DataUser } from "../types";
import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type TAuthContext = {
  user: DataUser;
  setUser: Dispatch<SetStateAction<DataUser>>;
};

// Create context
export const AuthContext = createContext<TAuthContext | null>(null);

// Hook
export function useAuthContext() {
  const contextValue = useContext(AuthContext);

  if (!contextValue) {
    throw new Error(
      "useAuthContext must be called from within a AppContextProvider",
    );
  }

  const { user, setUser } = contextValue;

  return { user, setUser };
}

// Provider
export default function AuthContextProvider(props: PropsWithChildren) {
  const [user, setUser] = useState<DataUser>({
    displayName: "",
    email: "",
    phoneNumber: "",
    photoURL: "",
    uid: "",
  });

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
        await fetch("/api/cookie", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: JSON.stringify(dataUser) }),
        });
        setUser(dataUser);
      } else {
        await fetch("/api/cookie", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        setUser({
          displayName: "",
          email: "",
          phoneNumber: "",
          photoURL: "",
          uid: "",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value} {...props} />;
}
