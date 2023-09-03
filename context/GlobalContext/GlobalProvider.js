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

  const changeSaldoAwalState = (payload, callback) => {
    callback && callback(payload);
    dispatch({ type: globalActionType.CHANGE_SALDO_AWAL, payload });
  };

  const changeSocialMediaLinksState = (payload, callback) => {
    callback && callback(payload);
    dispatch({ type: globalActionType.CHANGE_SOCIAL_MEDIA_LINKS, payload });
  };

  const changeSocialMediaAttachmentState = (payload, callback) => {
    callback && callback(payload);
    dispatch({ type: globalActionType.CHANGE_SOCIAL_MEDIA_ATTACHMENT, payload });
  };

  const pushRecordState = (payload, callback) => {
    callback && callback(payload);
    dispatch({ type: globalActionType.CREATE_RECORD, payload });
  };

  const removeRecordState = (id, callback) => {
    callback && callback(id);
    dispatch({ type: globalActionType.DELETE_RECORD, id });
  };

  const updateRecordState = () => (payload, callback) => {
    callback && callback(payload);
    dispatch({ type: globalActionType.UPDATE_RECORD, payload });
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
    changeSaldoAwalState,
    changeSocialMediaLinksState,
    changeSocialMediaAttachmentState,
    pushRecordState,
    removeRecordState,
    updateRecordState,
  }), [state]);
  return (<GlobalContext.Provider value={value} {...props} />);
}
