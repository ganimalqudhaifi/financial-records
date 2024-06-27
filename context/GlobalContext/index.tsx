import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useMemo,
  useReducer,
} from "react";
import { ActionType, GlobalState, globalReducer } from "./GlobalReducer";

export const globalInitialState = {
  initialBalance: 0,
  searchKeyword: "",
  sliceShow: 10,
  paginationIndex: 1,
  filterPeriod: "",
  isDemo: false,
  hasLoadData: false,
};

type TGlobalContext = {
  state: GlobalState;
  dispatch: Dispatch<ActionType>;
};

export const GlobalContext = createContext<TGlobalContext | null>(null);

export default function GlobalContextProvider(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(globalReducer, globalInitialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <GlobalContext.Provider value={value} {...props} />;
}
