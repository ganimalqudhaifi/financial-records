import { useEffect } from 'react';
import { database, onValue, ref } from '../config/firebase';

import { useAuthContext } from '../context/AuthContext';
import { useGlobalContext } from '../context/GlobalContext';

export default function useDatabaseObserver(path, callback) {
  const { state } = useGlobalContext();
  const { isDemo } = state;

  const { user } = useAuthContext();

  useEffect(() => {
    if ((user !== null) && (isDemo === false)) {
      const { uid } = user;
      const accountsRef = ref(database, `users/${uid}/${path}`);
      onValue(accountsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = Object.keys(snapshot.val()).map((key) => ({
            ...snapshot.val()[key],
            id: key,
          }));
          callback(data);
        }
      });
    }
  }, [user]);
}
