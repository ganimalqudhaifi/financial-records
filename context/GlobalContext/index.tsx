import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useMemo,
  useReducer,
} from "react";
import { ActionType, GlobalState, globalReducer } from "./GlobalReducer";

export const globalInitialState = {
  initialBalance: 0, // selectedAccount.initialBalance?
  searchKeyword: "", // only 1 page
  sliceShow: 10, // pagination refer
  paginationIndex: 1, // only 1 page
  filterPeriod: "", // only 1 page
};

type GlobalContext = {
  state: GlobalState;
  dispatch: Dispatch<ActionType>;
};

export const GlobalContext = createContext<GlobalContext | null>(null);

export default function GlobalContextProvider(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(globalReducer, globalInitialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <GlobalContext.Provider value={value} {...props} />;
}
