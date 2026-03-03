import { onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDemo } from "@/features/demo/demo.slice";
import { selectUser } from "@/features/user/user.slice";
import { database } from "@/lib/firebase/database";

export default function useDatabaseObserver(
  path: "accounts" | "records",
  callback: (data: any[]) => void,
) {
  const { user } = useSelector(selectUser);
  const { isDemo } = useSelector(selectDemo);

  useEffect(() => {
    if (user && !isDemo) {
      const { uid } = user;
      const dataRef = ref(database, `users/${uid}/${path}`);

      const unsubscribe = onValue(dataRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = Object.keys(snapshot.val()).map((key) => ({
            ...snapshot.val()[key],
            id: key,
          }));
          callback(data);
        } else {
          callback([]);
        }
      });

      return () => unsubscribe();
    }
  }, [user, isDemo, callback, path]);
}
