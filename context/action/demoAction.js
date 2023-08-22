import {
  database, ref, push, set, remove,
} from '../../config/firebase';
import checkUID from '../../utils/checkUID';
import { globalActionType } from '../GlobalContext';

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
