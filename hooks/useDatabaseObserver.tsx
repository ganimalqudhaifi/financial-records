import { onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { database } from "@/lib/firebase/database";
import { selectDemo } from "@/lib/redux/features/demo/demoSlice";
import { useAuthContext } from "./useAuthContext";

// eslint-disable-next-line no-unused-vars
export default function useDatabaseObserver(
  path: string,
  callback: (data: any) => void,
) {
  const { isDemo } = useSelector(selectDemo);

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
