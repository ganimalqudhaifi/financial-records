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

export const firebaseAddAccount = async (payload: Omit<Account, "id">) => {
  const uid = await getCurrentUserUid();
  const accountsRef = ref(database, `users/${uid}/accounts`);
  const newAccountRef = push(accountsRef, payload);
  const newAccountId = newAccountRef.key as string;
  return { ...payload, id: newAccountId } as Account;
};

export const firebaseUpdateAccount = async (payload: Account) => {
  const uid = await getCurrentUserUid();
  const accountRef = ref(database, `users/${uid}/accounts/${payload.id}`);
  set(accountRef, payload);
};

export const firebaseDeleteAccount = async (id: Account["id"]) => {
  const uid = await getCurrentUserUid();
  const accountRef = ref(database, `users/${uid}/accounts/${id}`);
  remove(accountRef);
};

export const firebaseAddRecord = async (payload: Omit<Record, "id">) => {
  const uid = await getCurrentUserUid();
  const recordsRef = ref(database, `users/${uid}/records`);
  const newRecordRef = push(recordsRef, payload);
  const newRecordId = newRecordRef.key as string;

  return { ...payload, id: newRecordId } as Record;
};

export const firebaseUpdateRecord = async (payload: Record) => {
  const uid = await getCurrentUserUid();
  const recordRef = ref(database, `users/${uid}/records/${payload.id}`);
  set(recordRef, payload);
};

export const firebaseDeleteRecord = async (id: Record["id"]) => {
  const uid = await getCurrentUserUid();
  const recordRef = ref(database, `users/${uid}/records/${id}`);
  remove(recordRef);
};
