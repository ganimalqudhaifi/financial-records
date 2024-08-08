import { onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { database } from "@/lib/firebase/database";
import { selectDemo } from "@/lib/redux/features/demo/demoSlice";
import { selectUser } from "@/lib/redux/features/user/userSlice";

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
        }
      });

      return () => unsubscribe();
    }
  }, [user, isDemo, callback, path]);
}
