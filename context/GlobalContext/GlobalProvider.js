import { useMemo, useReducer } from 'react';
import { globalReducer, globalInitialState, globalActionType } from './GlobalReducer';
import GlobalContext from './GlobalContext';

export default function GlobalContextProvider(props) {
  const [state, dispatch] = useReducer(globalReducer, globalInitialState);

  const changeIsDemoState = (payload) => {
    dispatch({ type: globalActionType.ISDEMO, payload });
  };

  const changeIsLoginState = (payload) => {
    dispatch({ type: globalActionType.ISLOGIN, payload });
  };

  const changeUserState = (payload) => {
    dispatch({ type: globalActionType.CHANGE_USER, payload });
  };

  const changeRecordsState = (payload) => {
    dispatch({ type: globalActionType.GET_RECORDS, payload });
  };

  const changePaginationIndexState = (btnpagination) => {
    dispatch({ type: globalActionType.CHANGE_PAGINATION_INDEX, payload: btnpagination });
  };

  const changeFilterPeriodState = (e) => {
    dispatch({ type: globalActionType.HANDLE_FILTER_PERIOD, payload: e.target.value });
  };

  const changeSliceShowState = (e) => {
    dispatch({ type: globalActionType.HANDLE_SLICE, payload: e.target.value });
  };

  const changePersonalInformationState = (payload, callback) => {
    callback && callback(payload);
    dispatch({ type: globalActionType.CHANGE_PERSONAL_INFORMATION, payload });
  };

  const changeSaldoAwalState = (payload, callback) => {
    callback && callback(payload);
    dispatch({ type: globalActionType.CHANGE_SALDO_AWAL, payload });
  };

  const value = useMemo(() => ({
    state,
    dispatch,
    changeIsLoginState,
    changeUserState,
    changeIsDemoState,
    changeRecordsState,
    changePaginationIndexState,
    changeFilterPeriodState,
    changeSliceShowState,
    changePersonalInformationState,
    changeSaldoAwalState,
  }), [state]);
  return (<GlobalContext.Provider value={value} {...props} />);
}
