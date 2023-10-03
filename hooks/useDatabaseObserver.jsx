import { useEffect } from 'react';
import { database, onValue, ref } from '../config/firebase';
import { checkUserUid } from '../utils';

export default function useDatabaseObserver(path, callback) {
  useEffect(() => {
    checkUserUid((uid) => {
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
    });
  }, []);
}
