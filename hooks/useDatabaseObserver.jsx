import { useEffect } from 'react';
import { database, onValue, ref } from '../config/firebase';
import { useAuthContext } from '../context';

export default function useDatabaseObserver(path, callback) {
  const { user } = useAuthContext();

  useEffect(() => {
    const unsubscribe = () => {
      if (user !== null) {
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
    };

    return () => unsubscribe();
  }, []);
}
