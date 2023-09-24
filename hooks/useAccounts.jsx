import { useEffect, useState } from 'react';
import { alertToast, checkUserUid } from '../utils';
import { database, onValue, push, ref, remove, set } from '../config/firebase';

export default function useAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState({});

  useEffect(() => {
    checkUserUid((uid) => {
      const accountsRef = ref(database, `users/${uid}/accounts`);
      onValue(accountsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = Object.keys(snapshot.val()).map((key) => ({
            ...snapshot.val()[key],
            id: key,
          }));
          setAccounts(data);
        }
      });
    });
  }, []);

  const addAccount = (payload) => {
    // max accounts 8
    if (accounts.length >= 8) {
      alertToast('Maximum of 8 Accounts Reached');
    } else {
      setAccounts((prevState) => ({
        ...prevState,
        payload,
      }));
      checkUserUid((uid) => {
        const accountsRef = ref(database, `users/${uid}/accounts`);
        push(accountsRef, payload);
      });
    }
  };

  const editAccount = (id, payload) => {
    const accountIndex = accounts.findIndex((account) => account.id === id);
    const updatedAccounts = accounts.fill(payload, accountIndex, accountIndex + 1);
    setAccounts(
      updatedAccounts,
    );
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
    const filteredAccounts = accounts.filter((account) => account.id !== id);
    setAccounts(
      filteredAccounts,
    );
    checkUserUid((uid) => {
      const accountRef = ref(database, `users/${uid}/accounts/${id}`);
      remove(accountRef);
    });
  };

  return {
    accounts,
    addAccount,
    editAccount,
    deleteAccount,
    selectedAccounts,
    setSelectedAccounts,
  };
}
