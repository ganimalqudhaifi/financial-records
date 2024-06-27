import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function useAppContext() {
  const contextValue = useContext(AppContext);

  if (!contextValue) {
    throw new Error(
      "useAppContext must be called from within a AppContextProvider",
    );
  }

  const { state, dispatch } = contextValue;

  return { state, dispatch };
}
