import { appActionType, useAppContext, useAuthContext, useGlobalContext } from '../context';
import { database, ref, push, set, remove } from '../config/firebase';

export default function useRecords() {
  const { state: globalState } = useGlobalContext();
  const { isDemo } = globalState;

  const { state: appState, dispatch } = useAppContext();
  const { records, hasDemoLoadRecords } = appState;

  const { user } = useAuthContext();

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
    if (isDemo) {
      dispatch({ type: appActionType.ADD_RECORDS, payload });
    } else {
      checkUid((uid) => {
        const recordsRef = ref(database, `users/${uid}/records`);
        push(recordsRef, payload);
      });
    }
  };

  const editRecord = (id, payload) => {
    if (isDemo) {
      dispatch({ type: appActionType.EDIT_RECORDS, id, payload });
    } else {
      checkUid((uid) => {
        const recordRef = ref(database, `users/${uid}/records/${id}`);
        set(recordRef, payload);
      });
    }
  };

  const deleteRecord = (id) => {
    if (isDemo) {
      dispatch({ type: appActionType.DELETE_RECORDS, id });
    } else {
      checkUid((uid) => {
        const recordRef = ref(database, `users/${uid}/records/${id}`);
        remove(recordRef);
      });
    }
  };

  const setHasDemoLoadRecords = (payload) => {
    dispatch({ type: appActionType.SET_HAS_DEMO_LOAD_RECORDS, payload });
  };

  return {
    records,
    setRecords,
    addRecord,
    editRecord,
    deleteRecord,
    hasDemoLoadRecords,
    setHasDemoLoadRecords,
  };
}
