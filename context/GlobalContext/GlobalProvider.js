import { useMemo, useReducer } from 'react';
import { globalReducer, globalInitialState, globalActionType } from './GlobalReducer';
import GlobalContext from './GlobalContext';

export function GlobalProvider(props) {
  const [state, dispatch] = useReducer(globalReducer, globalInitialState);

  const changeIsDemoState = (payload) => {
    dispatch({ type: globalActionType.CHANGE_ISDEMO, payload });
  };

  const changeIsLoginStateDupe = (payload) => {
    console.log('isLogin State Changed 2.0');
    dispatch({ type: globalActionType.CHANGE_ISLOGIN, payload });
  };

  const changeUserState = (payload) => {
    dispatch({ type: globalActionType.CHANGE_USER, payload });
  };

  const changePaginationIndexState = (btnpagination) => {
    dispatch({ type: globalActionType.HANDLE_PAGINATION_INDEX, payload: btnpagination });
  };

  const changeFilterPeriodState = (e) => {
    dispatch({ type: globalActionType.HANDLE_FILTER_PERIOD, payload: e.target.value });
  };

  const changeSliceShowState = (e) => {
    dispatch({ type: globalActionType.HANDLE_SLICE, payload: e.target.value });
  };

  const changeInitialBalanceState = (payload, callback) => {
    callback && callback(payload);
    dispatch({ type: globalActionType.CHANGE_INITIAL_BALANCE, payload });
  };

  const value = useMemo(() => ({
    state,
    dispatch,
    changeIsLoginStateDupe,
    changeIsDemoState,
    changeUserState,
    changePaginationIndexState,
    changeFilterPeriodState,
    changeSliceShowState,
    changeInitialBalanceState,
  }), [state]);
  return (<GlobalContext.Provider value={value} {...props} />);
}
