import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { Account, Record } from "@/types";
import { selectUser } from "../redux/features/user/userSlice";
import { store } from "../redux/store";
import { app } from "./client";

export const database = getDatabase(app);

const getCurrentUserUid = (): string | undefined => {
  const { user } = selectUser(store.getState());
  return user?.uid;
};

export const addAccount = (uid: string, payload: Account) => {
  const accountsRef = ref(database, `users/${uid}/accounts`);
  push(accountsRef, payload);
};

export const updateAccount = (uid: string, payload: Account) => {
  const accountRef = ref(database, `users/${uid}/accounts/${payload.id}`);
  set(accountRef, payload);
};

export const deleteAccount = (uid: string, payload: Account) => {
  const accountRef = ref(database, `users/${uid}/accounts/${payload.id}`);
  remove(accountRef);
};

export const addRecord = (uid: string, payload: Record) => {
  const recordsRef = ref(database, `users/${uid}/records`);
  push(recordsRef, payload);
};

export const updateRecord = (uid: string, payload: Record) => {
  const recordRef = ref(database, `users/${uid}/records/${payload.id}`);
  set(recordRef, payload);
};

export const deleteRecord = (uid: string, payload: Record) => {
  const recordRef = ref(database, `users/${uid}/records/${payload.id}`);
  remove(recordRef);
};

export const observeRecords = (): Promise<Record[]> => {
  const uid = getCurrentUserUid();
  if (!uid) {
    throw new Error("User is not authenticated");
  }

  return new Promise((resolve) => {
    const recordsRef = ref(database, `users/${uid}/$records`);
    onValue(recordsRef, (snapshot) => {
      if (snapshot.exists()) {
        const items: Record[] = [];
        snapshot.forEach((childSnapshot) => {
          const item = childSnapshot.val();
          item.id = childSnapshot.key;
          items.push(item);
        });
        resolve(items);
      } else {
        resolve([]);
      }
    });
  });
};
