import { database, ref, set } from '../config/firebase';
import { storage } from './storage';

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
