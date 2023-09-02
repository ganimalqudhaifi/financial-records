import { database, get, ref, set } from '../config/firebase';
import { storage } from './storage';

export const getPersonalInformation = () => {
  const uid = storage.getUID();
  const personalInformationRef = ref(database, `users/${uid}/personalInformation`);
  get(personalInformationRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return {
      firstName: 'New',
      lastName: 'User',
      phone: '',
      bio: '',
    };
  });
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
