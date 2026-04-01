import { useContext } from "react";
import { AuthContext } from "@/app/AuthContextProvider";

export function useAuthContext() {
  const contextValue = useContext(AuthContext);

  if (!contextValue) {
    throw new Error(
      "useAuthContext must be called from within a AuthContextProvider",
    );
  }

  const { user } = contextValue;

  return { user };
}
