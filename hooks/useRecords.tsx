import { push, ref, remove, set } from 'firebase/database';

import { database } from '../config/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useGlobalContext } from '../context/GlobalContext';
import { useAppContext } from '../context/AppContext';

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
    dispatch({ type: 'SET_RECORDS', payload });
  };

  const addRecord = (payload) => {
    if (isDemo) {
      dispatch({ type: 'ADD_RECORDS', payload });
    } else {
      checkUid((uid) => {
        const recordsRef = ref(database, `users/${uid}/records`);
        push(recordsRef, payload);
      });
    }
  };

  const editRecord = (id, payload) => {
    if (isDemo) {
      dispatch({ type: 'EDIT_RECORDS', id, payload });
    } else {
      checkUid((uid) => {
        const recordRef = ref(database, `users/${uid}/records/${id}`);
        set(recordRef, payload);
      });
    }
  };

  const deleteRecord = (id) => {
    if (isDemo) {
      dispatch({ type: 'DELETE_RECORDS', id });
    } else {
      checkUid((uid) => {
        const recordRef = ref(database, `users/${uid}/records/${id}`);
        remove(recordRef);
      });
    }
  };

  const setHasDemoLoadRecords = (payload) => {
    dispatch({ type: 'SET_HAS_DEMO_LOAD_RECORDS', payload });
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
