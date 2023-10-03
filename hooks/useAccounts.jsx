import { alertToast } from '../utils';
import { database, onValue, push, ref, remove, set } from '../config/firebase';
import { appActionType, useAppContext, useAuthContext } from '../context';

export default function useAccounts() {
  const { state, dispatch } = useAppContext();
  const { user } = useAuthContext();
  const { accounts, activeAccountIndex, selectedAccount } = state;

  const checkUid = (callback) => {
    if (user !== null) {
      callback(user.uid);
    } else {
      throw new Error('user data has not loaded');
    }
  };

  const setAccounts = (payload) => {
    dispatch({ type: appActionType.SET_ACCOUNTS, payload });
  };

  const addAccount = (payload) => {
    if (accounts.length >= 8) {
      alertToast('Maximum of 8 Accounts Reached');
    } else {
      checkUid((uid) => {
        const accountsRef = ref(database, `users/${uid}/accounts`);
        push(accountsRef, payload);
      });
    }
  };

  const editAccount = (id, payload) => {
    checkUid((uid) => {
      const accountRef = ref(database, `users/${uid}/accounts/${id}`);
      set(accountRef, payload);
    });
  };

  const deleteAccount = (id) => {
    if (accounts.length <= 1) {
      alertToast('Minimal 1 Akun Diperlukan');
      return;
    }
    checkUid((uid) => {
      const accountRef = ref(database, `users/${uid}/accounts/${id}`);
      remove(accountRef);
      const recordsRef = ref(database, `users/${uid}/records/`);
      onValue(recordsRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          if (childData.accountId === id) {
            const recordRef = ref(database, `users/${uid}/records/${childKey}`);
            remove(recordRef);
          }
        });
      }, { onlyOnce: true });
    });
  };

  const setActiveAccountIndex = (payload) => {
    dispatch({ type: appActionType.SET_ACTIVE_ACCOUNT_INDEX, payload });
  };

  const setSelectedAccount = (payload) => {
    dispatch({ type: appActionType.SET_SELECTED_ACCOUNT, payload });
  };

  return {
    accounts,
    setAccounts,
    addAccount,
    editAccount,
    deleteAccount,
    activeAccountIndex,
    setActiveAccountIndex,
    selectedAccount,
    setSelectedAccount,
  };
}
