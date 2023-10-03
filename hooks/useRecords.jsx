import { appActionType, useAppContext } from '../context';
import { database, ref, push, set, remove, auth } from '../config/firebase';

export default function useRecords() {
  const { state, dispatch } = useAppContext();
  const { records } = state;

  const setRecords = (payload) => {
    dispatch({ type: appActionType.SET_RECORDS, payload });
  };

  const addRecord = (payload) => {
    const { uid } = auth.currentUser;
    const recordsRef = ref(database, `users/${uid}/records`);
    push(recordsRef, payload);
  };

  const editRecord = (id, payload) => {
    const { uid } = auth.currentUser;
    const recordRef = ref(database, `users/${uid}/records/${id}`);
    set(recordRef, payload);
  };

  const deleteRecord = (id) => {
    const { uid } = auth.currentUser;
    const recordRef = ref(database, `users/${uid}/records/${id}`);
    remove(recordRef);
  };

  return {
    records,
    setRecords,
    addRecord,
    editRecord,
    deleteRecord,
  };
}
