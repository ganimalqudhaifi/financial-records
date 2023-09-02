import { database, get, onValue, push, ref, remove, set } from '../config/firebase';
import { storage } from './storage';

export const pushRecord = () => (payload) => {
  const uid = storage.getUID();
  const recordsRef = ref(database, `users/${uid}/records`);
  push(recordsRef, payload);
};

export const removeRecord = () => (id) => {
  const uid = storage.getUID();
  const recordRef = ref(database, `users/${uid}/records/${id}`);
  remove(recordRef);
};

export const updateRecord = () => (payload) => {
  const uid = storage.getUID();
  const recordRef = ref(database, `users/${uid}/records/${payload.id}`);
  set(recordRef, payload);
};

export const getPersonalInformation = async () => {
  const uid = storage.getUID();
  const personalInformationRef = ref(database, `users/${uid}/personalInformation`);
  await get(personalInformationRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  });
};

export const getSocialMediaLinks = async () => {
  const uid = storage.getUID();
  const socialMediaLinksRef = ref(database, `users/${uid}/socialMediaLinks`);
  await get(socialMediaLinksRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  });
};

export const getSocialMediaAttachment = async () => {
  const uid = storage.getUID();
  const socialMediaAttachmentRef = ref(database, `users/${uid}/socialMediaAttachment`);
  await get(socialMediaAttachmentRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  });
};

export const observeSaldoAwal = (callback) => {
  const uid = storage.getUID();
  const saldoAwalRef = ref(database, `users/${uid}/saldoAwal`);
  onValue(saldoAwalRef, callback);
};

export const observeRecords = (callback) => {
  const uid = storage.getUID();
  const recordsRef = ref(database, `users/${uid}/records`);
  onValue(recordsRef, callback);
};

export const updatePersonalInformation = () => (payload) => {
  const uid = storage.getUID();
  const personalInformationRef = ref(database, `users/${uid}/personalInformation`);
  set(personalInformationRef, payload);
};

export const updateSaldoAwal = () => (payload) => {
  const uid = storage.getUID();
  const saldoAwalRef = ref(database, `users/${uid}/saldoAwal`);
  set(saldoAwalRef, payload);
};

export const updateSocialMediaLinks = () => (payload) => {
  const uid = storage.getUID();
  const socialMediaLinksRef = ref(database, `users/${uid}/socialMediaLinks`);
  set(socialMediaLinksRef, payload);
};

export const updateSocialMediaAttachment = () => (payload) => {
  const uid = storage.getUID();
  const socialMediaAttachmentRef = ref(database, `users/${uid}/socialMediaAttachment`);
  set(socialMediaAttachmentRef, payload);
};
