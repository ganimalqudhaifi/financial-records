import {
  globalReducer,
  globalInitialState,
  ACTION_TYPE,
} from "./GlobalReducer";
import {
  ChangeEvent,
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from "react";

type TGlobalContext = {
  state: typeof globalInitialState;
  dispatch: Dispatch<ACTION_TYPE>;
};

// Create context
const GlobalContext = createContext<TGlobalContext | null>(null);

// Hook
export const useGlobalContext = () => {
  const contextValue = useContext(GlobalContext);

  if (!contextValue) {
    throw new Error(
      "useGlobalContext must be called from within a GlobalContextProvider",
    );
  }

  const { state, dispatch } = contextValue;

  const setIsDemo = (payload: boolean) => {
    dispatch({ type: "SET_ISDEMO", payload });
  };

  const changePaginationIndexState = (btnpagination: number) => {
    dispatch({ type: "HANDLE_PAGINATION_INDEX", payload: btnpagination });
  };

  const changeFilterPeriodState = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "HANDLE_FILTER_PERIOD", payload: e.target.value });
  };

  const changeSliceShowState = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "HANDLE_SLICE", payload: parseInt(e.target.value, 19) });
  };

  const changeInitialBalanceState = (payload: number) => {
    dispatch({ type: "CHANGE_INITIAL_BALANCE", payload });
  };

  return {
    state,
    dispatch,
    setIsDemo,
    changePaginationIndexState,
    changeFilterPeriodState,
    changeSliceShowState,
    changeInitialBalanceState,
  };
};

// Provider
export default function GlobalContextProvider(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(globalReducer, globalInitialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <GlobalContext.Provider value={value} {...props} />;
}

export * from "./GlobalReducer";
