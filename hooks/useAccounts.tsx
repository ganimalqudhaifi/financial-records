import { database } from "../config/firebase";
import { useAppContext } from "../context/AppContext";
import { useAuthContext } from "../context/AuthContext";
import { useGlobalContext } from "../context/GlobalContext";
import { Account } from "../types";
import { alertToast } from "../utils";
import { onValue, push, ref, remove, set } from "firebase/database";

export default function useAccounts() {
  const { state: globalState } = useGlobalContext();
  const { isDemo } = globalState;

  const { state: appState, dispatch } = useAppContext();
  const { user } = useAuthContext();

  const { accounts, activeAccountIndex, selectedAccount } = appState;

  // eslint-disable-next-line no-unused-vars
  const checkUid = (callback: (uid: string) => void) => {
    if (user !== null) {
      callback(user.uid);
    } else {
      throw new Error("user data has not loaded");
    }
  };

  const setAccounts = (payload: Account[]) => {
    dispatch({ type: "SET_ACCOUNTS", payload });
  };

  const addAccount = (payload: Account) => {
    if (accounts.length >= 8) {
      alertToast("Maximum of 8 Accounts Reached");
    } else if (isDemo) {
      dispatch({ type: "ADD_ACCOUNTS", payload });
    } else {
      checkUid((uid) => {
        const accountsRef = ref(database, `users/${uid}/accounts`);
        push(accountsRef, payload);
      });
    }
  };

  const editAccount = (payload: Account) => {
    if (isDemo) {
      dispatch({ type: "EDIT_ACCOUNTS", payload });
    } else {
      checkUid((uid) => {
        const accountRef = ref(database, `users/${uid}/accounts/${payload.id}`);
        set(accountRef, payload);
      });
    }
  };

  const deleteAccount = (id: Account["id"]) => {
    if (accounts.length <= 1) {
      alertToast("Minimal 1 Akun Diperlukan");
    } else if (isDemo) {
      dispatch({ type: "DELETE_ACCOUNTS", id });
    } else {
      checkUid((uid) => {
        const accountRef = ref(database, `users/${uid}/accounts/${id}`);
        remove(accountRef);
        const recordsRef = ref(database, `users/${uid}/records/`);
        onValue(
          recordsRef,
          (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const childKey = childSnapshot.key;
              const childData = childSnapshot.val();
              if (childData.accountId === id) {
                const recordRef = ref(
                  database,
                  `users/${uid}/records/${childKey}`,
                );
                remove(recordRef);
              }
            });
          },
          { onlyOnce: true },
        );
      });
    }
  };

  const setActiveAccountIndex = (payload: number) => {
    dispatch({ type: "SET_ACTIVE_ACCOUNT_INDEX", payload });
  };

  const setSelectedAccount = (payload: Account) => {
    dispatch({ type: "SET_SELECTED_ACCOUNT", payload });
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
