import { useEffect } from 'react';
import { auth, database, onValue, ref } from '../config/firebase';

export default function useDatabaseObserver(path, callback) {
  useEffect(() => {
    const { uid } = auth.currentUser;
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
  }, [auth]);
}
