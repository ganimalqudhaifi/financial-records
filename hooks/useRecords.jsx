import { appActionType, useAppContext } from '../context';
import { checkUserUid } from '../utils';
import { database, ref, push, set, remove } from '../config/firebase';

export default function useRecords() {
  const { state, dispatch } = useAppContext();
  const { records } = state;

  const setRecords = (payload) => {
    dispatch({ type: appActionType.SET_RECORDS, payload });
  };

  const addRecord = (payload) => {
    checkUserUid((uid) => {
      const recordsRef = ref(database, `users/${uid}/records`);
      push(recordsRef, payload);
    });
  };

  const editRecord = (id, payload) => {
    checkUserUid((uid) => {
      const recordRef = ref(database, `users/${uid}/records/${id}`);
      set(recordRef, payload);
    });
  };

  const deleteRecord = (id) => {
    checkUserUid((uid) => {
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
