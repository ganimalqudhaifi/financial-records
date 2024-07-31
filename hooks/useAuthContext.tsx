import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuthContext() {
  const contextValue = useContext(AuthContext);

  if (!contextValue) {
    throw new Error(
      "useAuthContext must be called from within a AuthContextProvider",
    );
  }

  const { user, setUser } = contextValue;

  return { user, setUser };
}
