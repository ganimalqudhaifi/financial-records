import { database } from "@/lib/firebase/database";
import { getCurrentUserUid } from "@/shared/auth/getCurrentUserUid";
import { push, ref, remove, set } from "firebase/database";
import { Record } from "./record.types";

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