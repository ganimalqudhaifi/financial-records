import { alertToast } from '../utils';
import { auth, database, onValue, push, ref, remove, set } from '../config/firebase';
import { appActionType, useAppContext } from '../context';

export default function useAccounts() {
  const { state, dispatch } = useAppContext();
  const { accounts, activeAccountIndex, selectedAccount } = state;

  const setAccounts = (payload) => {
    dispatch({ type: appActionType.SET_ACCOUNTS, payload });
  };

  const addAccount = (payload) => {
    if (accounts.length >= 8) {
      alertToast('Maximum of 8 Accounts Reached');
    } else {
      const { uid } = auth.currentUser;
      const accountsRef = ref(database, `users/${uid}/accounts`);
      push(accountsRef, payload);
    }
  };

  const editAccount = (id, payload) => {
    const { uid } = auth.currentUser;
    const accountRef = ref(database, `users/${uid}/accounts/${id}`);
    set(accountRef, payload);
  };

  const deleteAccount = (id) => {
    if (accounts.length <= 1) {
      alertToast('Minimal 1 Akun Diperlukan');
      return;
    }
    const { uid } = auth.currentUser;
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
  };

  const setActiveAccountIndex = (payload) => {
    dispatch({ type: appActionType.SET_ACTIVE_ACCOUNT_INDEX, payload });
  };

  const setSelectedAccount = (payload) => {
    dispatch({ type: appActionType.SET_SELECTED_ACCOUNT, payload });
  };

  const resetAccount = () => {
    dispatch({ type: appActionType.RESET_STATE });
  };

  return {
    accounts,
    setAccounts,
    addAccount,
    editAccount,
    resetAccount,
    deleteAccount,
    activeAccountIndex,
    setActiveAccountIndex,
    selectedAccount,
    setSelectedAccount,
  };
}
