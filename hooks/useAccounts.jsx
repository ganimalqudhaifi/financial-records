import { useEffect, useState } from 'react';
import { alertToast, checkUserUid } from '../utils';
import { database, onValue, push, ref, remove, set } from '../config/firebase';
import { appActionType, useAppContext } from '../context';

export default function useAccounts() {
  const { state, dispatch } = useAppContext();
  const { accounts } = state;

  const [indexAccount, setIndexAccount] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState({});

  useEffect(() => {
    checkUserUid((uid) => {
      const accountsRef = ref(database, `users/${uid}/accounts`);
      onValue(accountsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = Object.keys(snapshot.val()).map((key) => ({
            ...snapshot.val()[key],
            id: key,
          }));
          dispatch({ type: appActionType.SET_ACCOUNTS, payload: data });
        }
      });
    });
  }, []);

  useEffect(() => {
    accounts.length && setSelectedAccount(accounts[indexAccount]);
  }, [accounts, indexAccount]);

  const addAccount = (payload) => {
    if (accounts.length >= 8) {
      alertToast('Maximum of 8 Accounts Reached');
    } else {
      checkUserUid((uid) => {
        const accountsRef = ref(database, `users/${uid}/accounts`);
        push(accountsRef, payload);
        dispatch({ type: appActionType.ADD_ACCOUNTS, payload });
      });
    }
  };

  const editAccount = (id, payload) => {
    checkUserUid((uid) => {
      const accountRef = ref(database, `users/${uid}/accounts/${id}`);
      set(accountRef, payload);
      dispatch({ type: appActionType.EDIT_ACCOUNTS, id, payload });
    });
  };

  const deleteAccount = (id) => {
    if (accounts.length <= 1) {
      alertToast('Minimal 1 Akun Diperlukan');
      return;
    }
    checkUserUid((uid) => {
      const accountRef = ref(database, `users/${uid}/accounts/${id}`);
      remove(accountRef);
      dispatch({ type: appActionType.DELETE_ACCOUNTS, id });
    });
  };

  return {
    accounts,
    addAccount,
    editAccount,
    deleteAccount,
    selectedAccount,
    indexAccount,
    setIndexAccount,
  };
}
