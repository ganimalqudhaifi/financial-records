import { database } from "../config/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useGlobalContext } from "../context/GlobalContext";
import { onValue, ref } from "firebase/database";
import { useEffect } from "react";

// eslint-disable-next-line no-unused-vars
export default function useDatabaseObserver(
  path: string,
  callback: (data: any) => void,
) {
  const { state } = useGlobalContext();
  const { isDemo } = state;

  const { user } = useAuthContext();

  useEffect(() => {
    if (user !== null && isDemo === false) {
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
