import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useMemo,
  useReducer,
} from "react";
import { Account, Record } from "../../types";
import { ActionType, AppState, appReducer } from "./AppReducer";

type AppContext = {
  state: AppState;
  dispatch: Dispatch<ActionType>;
};

export const appInitialState = {
  accounts: [] as Account[],
  activeAccountIndex: 0,
  selectedAccount: {} as Account,
  records: [] as Record[],
  hasDemoLoadRecords: false,
};

export const AppContext = createContext<AppContext | null>(null);

export default function AppContextProvider(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(appReducer, appInitialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppContext.Provider value={value} {...props} />;
}
