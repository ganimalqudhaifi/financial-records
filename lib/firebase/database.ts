import { getDatabase, push, ref, remove, set } from "firebase/database";
import { Account, Record } from "@/types";
import { app } from "./client";

export const database = getDatabase(app);

const getCurrentUserUid = async () => {
  const res = await fetch("/api/user", {
    method: "GET",
  });
  const user = await res.json();
  return user.uid;
};

export const firebaseAddAccount = (uid: string, payload: Account) => {
  const accountsRef = ref(database, `users/${uid}/accounts`);
  push(accountsRef, payload);
};

export const firebaseUpdateAccount = (uid: string, payload: Account) => {
  const accountRef = ref(database, `users/${uid}/accounts/${payload.id}`);
  set(accountRef, payload);
};

export const firebaseDeleteAccount = (uid: string, payload: Account) => {
  const accountRef = ref(database, `users/${uid}/accounts/${payload.id}`);
  remove(accountRef);
};

export const firebaseAddRecord = async (payload: Omit<Record, "id">) => {
  const uid = await getCurrentUserUid();
  const recordsRef = ref(database, `users/${uid}/records`);
  return push(recordsRef, payload);
};

export const firebaseUpdateRecord = (uid: string, payload: Record) => {
  const recordRef = ref(database, `users/${uid}/records/${payload.id}`);
  set(recordRef, payload);
};

export const firebaseDeleteRecord = (uid: string, payload: Record) => {
  const recordRef = ref(database, `users/${uid}/records/${payload.id}`);
  remove(recordRef);
};
