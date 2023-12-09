import { createContext, Dispatch, FormEvent, useContext, useMemo, useReducer } from 'react';
import { globalReducer, globalInitialState, ACTION_TYPE } from './GlobalReducer';

type TGlobalContext = {
  state: typeof globalInitialState,
  dispatch: Dispatch<ACTION_TYPE>
}

// Create context
const GlobalContext = createContext<TGlobalContext | null>(null);

// Hook
export const useGlobalContext = () => {
  const contextValue = useContext(GlobalContext);

  if (!contextValue) {
    throw new Error('useGlobalContext must be called from within a GlobalContextProvider');
  }

  const { state, dispatch } = contextValue;

  const setIsDemo = (payload: boolean) => {
    dispatch({ type: 'SET_ISDEMO', payload });
  };

  const changePaginationIndexState = (btnpagination : number) => {
    dispatch({ type: 'HANDLE_PAGINATION_INDEX', payload: btnpagination });
  };

  const changeFilterPeriodState = (e : FormEvent<HTMLInputElement>) => {
    dispatch({ type: 'HANDLE_FILTER_PERIOD', payload: e.currentTarget.value });
  };

  const changeSliceShowState = (e: FormEvent<HTMLInputElement>) => {
    dispatch({ type: 'HANDLE_SLICE', payload: e.currentTarget.value });
  };

  const changeInitialBalanceState = (payload: string, callback: any) => {
    callback && callback(payload);
    dispatch({ type: 'CHANGE_INITIAL_BALANCE', payload });
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
export default function GlobalContextProvider(props: any) {
  const [state, dispatch] = useReducer(globalReducer, globalInitialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (<GlobalContext.Provider value={value} {...props} />);
}

export * from './GlobalReducer';
