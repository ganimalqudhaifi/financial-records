import {
  database, ref, push, set, remove,
} from '../../config/firebase';
import { globalActionType } from '../reducer/globalReducer';

export const showModal = (action) => ({
  type: globalActionType.SHOW_MODAL,
  action,
});

export const hideModal = (action) => ({
  type: globalActionType.HIDE_MODAL,
  action,
});

export const closeModal = (event, action) => ({
  type: globalActionType.CLOSE_MODAL,
  event,
  action,
});

export const handleSearch = (payload) => ({
  type: globalActionType.HANDLE_SEARCH,
  payload,
});

export const handleSlice = (payload) => ({
  type: globalActionType.HANDLE_SLICE,
  payload,
});

export const handleFilterPeriod = (payload) => ({
  type: globalActionType.HANDLE_FILTER_PERIOD,
  payload,
});

export const changePaginationIndex = (payload) => ({
  type: globalActionType.CHANGE_PAGINATION_INDEX,
  payload,
});

export const changeSaldoAwal = (payload) => ({
  type: globalActionType.CHANGE_SALDO_AWAL,
  payload,
});

export const createRecord = (isDemo, payload) => {
  if (!isDemo) {
    const uid = JSON.parse(localStorage.getItem('uid'));
    push(ref(database, `records/${uid}`), payload);
  } else {
    return {
      type: globalActionType.CREATE_RECORD,
      payload,
    };
  }
};

export const setRecords = (records) => ({
  type: globalActionType.GET_RECORDS,
  payload: records,
});

export const updateRecords = (isDemo, payload) => {
  if (!isDemo) {
    const uid = JSON.parse(localStorage.getItem('uid'));
    set(ref(database, `records/${uid}/${payload.id}`), payload);
  } else {
    return {
      type: globalActionType.UPDATE_RECORD,
      payload,
    };
  }
};

export const deleteRecord = (isDemo, id) => {
  if (!isDemo) {
    const uid = JSON.parse(localStorage.getItem('uid'));
    remove(ref(database, `records/${uid}/${id}`));
  } else {
    return {
      type: globalActionType.DELETE_RECORD,
      id,
    };
  }
};

export const changeUser = (payload) => ({
  type: globalActionType.CHANGE_USER,
  payload,
});

export const isDemo = (payload) => ({
  type: globalActionType.ISDEMO,
  payload,
});

export const isLogin = (payload) => ({
  type: globalActionType.ISLOGIN,
  payload,
});
