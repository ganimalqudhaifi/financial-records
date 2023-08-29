import { database, ref, set } from '../config/firebase';

export const updatePersonalInformation = (uid, payload) => {
  const personalInformationRef = ref(database, `users/${uid}/personalInformation`);
  set(personalInformationRef, payload);
};
