import { createContext, useContext, useMemo, useReducer } from 'react';
import { globalReducer, globalInitialState, GLOBAL_ACTION_TYPE } from './GlobalReducer';

// Create context
const GlobalContext = createContext();

// Hook
export const useGlobalContext = () => {
  const contextValue = useContext(GlobalContext);

  if (!contextValue) {
    throw new Error('useGlobalContext must be called from within a GlobalContextProvider');
  }

  const { state, dispatch } = contextValue;

  const setIsDemo = (payload) => {
    dispatch({ type: GLOBAL_ACTION_TYPE.SET_ISDEMO, payload });
  };

  const changePaginationIndexState = (btnpagination) => {
    dispatch({ type: GLOBAL_ACTION_TYPE.HANDLE_PAGINATION_INDEX, payload: btnpagination });
  };

  const changeFilterPeriodState = (e) => {
    dispatch({ type: GLOBAL_ACTION_TYPE.HANDLE_FILTER_PERIOD, payload: e.target.value });
  };

  const changeSliceShowState = (e) => {
    dispatch({ type: GLOBAL_ACTION_TYPE.HANDLE_SLICE, payload: e.target.value });
  };

  const changeInitialBalanceState = (payload, callback) => {
    callback && callback(payload);
    dispatch({ type: GLOBAL_ACTION_TYPE.CHANGE_INITIAL_BALANCE, payload });
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
export default function GlobalContextProvider(props) {
  const [state, dispatch] = useReducer(globalReducer, globalInitialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (<GlobalContext.Provider value={value} {...props} />);
}

export * from './GlobalReducer';
