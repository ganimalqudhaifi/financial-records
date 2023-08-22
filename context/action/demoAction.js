import {
  database, ref, push, set, remove,
} from '../../config/firebase';
import checkUID from '../../utils/checkUID';
import { globalActionType } from '../GlobalContext';

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

export const changeSaldoAwal = (isDemo, payload) => {
  if (!isDemo) {
    const uid = JSON.parse(checkUID());
    set(ref(database, `users/${uid}/saldoAwal`), payload);
  }
  return {
    type: globalActionType.CHANGE_SALDO_AWAL,
    payload,
  };
};

export const changeSocialMediaLinks = (isDemo, payload) => {
  if (!isDemo) {
    const uid = JSON.parse(checkUID());
    set(ref(database, `users/${uid}/socialMediaLinks`), payload);
  }
  return {
    type: globalActionType.CHANGE_SOCIAL_MEDIA_LINKS,
    payload,
  };
};

export const changeSocialMediaAttachment = (isDemo, payload) => {
  if (!isDemo) {
    const uid = JSON.parse(checkUID());
    set(ref(database, `users/${uid}/socialMediaAttachment`), payload);
  }
  return {
    type: globalActionType.CHANGE_SOCIAL_MEDIA_ATTACHMENT,
    payload,
  };
};

export const createRecord = (isDemo, payload) => {
  if (!isDemo) {
    const uid = JSON.parse(checkUID());
    push(ref(database, `users/${uid}/records`), payload);
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
    const uid = JSON.parse(checkUID());
    set(ref(database, `users/${uid}/records/${payload.id}`), payload);
  } else {
    return {
      type: globalActionType.UPDATE_RECORD,
      payload,
    };
  }
};

export const deleteRecord = (isDemo, id) => {
  if (!isDemo) {
    const uid = JSON.parse(checkUID());
    remove(ref(database, `users/${uid}/records/${id}`));
  }
  return {
    type: globalActionType.DELETE_RECORD,
    id,
  };
};

export const changeUser = (payload) => ({
  type: globalActionType.CHANGE_USER,
  payload,
});

export const changePersonalInformation = (isDemo, payload) => {
  if (!isDemo) {
    const uid = JSON.parse(checkUID());
    set(ref(database, `users/${uid}/personalInformation`), payload);
  }
  return {
    type: globalActionType.CHANGE_PERSONAL_INFORMATION,
    payload,
  };
};

export const isDemo = (payload) => ({
  type: globalActionType.ISDEMO,
  payload,
});

export const isLogin = (payload) => ({
  type: globalActionType.ISLOGIN,
  payload,
});
