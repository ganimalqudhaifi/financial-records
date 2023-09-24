import { useMemo, useReducer } from 'react';
import { globalReducer, globalInitialState, globalActionType } from './GlobalReducer';
import GlobalContext from './GlobalContext';

export default function GlobalContextProvider(props) {
  const [state, dispatch] = useReducer(globalReducer, globalInitialState);

  const changeIsDemoState = (payload) => {
    dispatch({ type: globalActionType.CHANGE_ISDEMO, payload });
  };

  const changeIsLoginState = (payload) => {
    dispatch({ type: globalActionType.CHANGE_ISLOGIN, payload });
  };

  const changeUserState = (payload) => {
    dispatch({ type: globalActionType.CHANGE_USER, payload });
  };

  const changeRecordsState = (payload) => {
    dispatch({ type: globalActionType.GET_RECORDS, payload });
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

  const pushRecordState = (payload, callback) => {
    callback && callback(payload);
    dispatch({ type: globalActionType.CREATE_RECORD, payload });
  };

  const removeRecordState = (id, callback) => {
    callback && callback(id);
    dispatch({ type: globalActionType.DELETE_RECORD, id });
  };

  const updateRecordState = (payload, callback) => {
    callback && callback(payload);
    dispatch({ type: globalActionType.UPDATE_RECORD, payload });
  };

  const changeHasLoadDataState = (payload) => {
    dispatch({ type: globalActionType.CHANGE_HAS_LOAD_DATA, payload });
  };

  const changeSelectedAccountState = (payload) => {
    dispatch({ type: globalActionType.SELECTED_ACCOUNT, payload });
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
    changeInitialBalanceState,
    changeSelectedAccountState,
    pushRecordState,
    removeRecordState,
    updateRecordState,
    changeHasLoadDataState,
  }), [state]);
  return (<GlobalContext.Provider value={value} {...props} />);
}
