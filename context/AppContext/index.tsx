import { ACTION_TYPE, appInitialState, appReducer } from "./AppReducer";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from "react";

type TAppContext = {
  state: typeof appInitialState;
  dispatch: Dispatch<ACTION_TYPE>;
};

// Create context
export const AppContext = createContext<TAppContext | null>(null);

// Hook
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

// Provider
export default function AppContextProvider(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(appReducer, appInitialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppContext.Provider value={value} {...props} />;
}

export * from "./AppReducer";
