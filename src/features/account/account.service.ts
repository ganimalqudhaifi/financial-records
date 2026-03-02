import { database } from "@/lib/firebase/database";
import { getCurrentUserUid } from "@/shared/auth/getCurrentUserUid";
import { push, ref, remove, set } from "firebase/database";
import { Account } from "./account.types";

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