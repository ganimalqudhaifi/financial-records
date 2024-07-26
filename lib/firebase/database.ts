import { getDatabase, push, ref, remove, set } from "firebase/database";
import { app } from "./client";

const database = getDatabase(app);

export const addAccount = (uid: string, payload: any) => {
  const accountsRef = ref(database, `users/${uid}/accounts`);
  push(accountsRef, payload);
};

export const updateAccount = (uid: string, payload: any) => {
  const accountRef = ref(database, `users/${uid}/accounts/${payload.id}`);
  set(accountRef, payload);
};

export const deleteAccount = (uid: string, payload: any) => {
  const accountRef = ref(database, `users/${uid}/accounts/${payload.id}`);
  remove(accountRef);
};

export const addRecord = (uid: string, payload: any) => {
  const recordsRef = ref(database, `users/${uid}/records`);
  push(recordsRef, payload);
};

export const updateRecord = (uid: string, payload: any) => {
  const recordRef = ref(database, `users/${uid}/records/${payload.id}`);
  set(recordRef, payload);
};

export const deleteRecord = (uid: string, payload: any) => {
  const recordRef = ref(database, `users/${uid}/records/${payload.id}`);
  remove(recordRef);
};
