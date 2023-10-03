import { appActionType, useAppContext, useAuthContext } from '../context';
import { database, ref, push, set, remove } from '../config/firebase';

export default function useRecords() {
  const { state, dispatch } = useAppContext();
  const { user } = useAuthContext();
  const { records } = state;

  const checkUid = (callback) => {
    if (user !== null) {
      callback(user.uid);
    } else {
      throw new Error('user data has not loaded');
    }
  };

  const setRecords = (payload) => {
    dispatch({ type: appActionType.SET_RECORDS, payload });
  };

  const addRecord = (payload) => {
    checkUid((uid) => {
      const recordsRef = ref(database, `users/${uid}/records`);
      push(recordsRef, payload);
    });
  };

  const editRecord = (id, payload) => {
    checkUid((uid) => {
      const recordRef = ref(database, `users/${uid}/records/${id}`);
      set(recordRef, payload);
    });
  };

  const deleteRecord = (id) => {
    checkUid((uid) => {
      const recordRef = ref(database, `users/${uid}/records/${id}`);
      remove(recordRef);
    });
  };

  return {
    records,
    setRecords,
    addRecord,
    editRecord,
    deleteRecord,
  };
}
