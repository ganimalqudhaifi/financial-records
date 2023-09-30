import { alertToast, checkUserUid } from '../utils';
import { database, push, ref, remove, set } from '../config/firebase';
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
      checkUserUid((uid) => {
        const accountsRef = ref(database, `users/${uid}/accounts`);
        push(accountsRef, payload);
      });
    }
  };

  const editAccount = (id, payload) => {
    checkUserUid((uid) => {
      const accountRef = ref(database, `users/${uid}/accounts/${id}`);
      set(accountRef, payload);
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
