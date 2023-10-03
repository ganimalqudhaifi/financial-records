import { useEffect } from 'react';
import { auth, database, onAuthStateChanged, onValue, ref } from '../config/firebase';

export default function useDatabaseObserver(path, callback) {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
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
    });
  }, []);
}
