import { database, get, onValue, push, ref, remove, set } from '../config/firebase';
import { checkUserUid } from './authentication';

export const pushRecord = () => (payload) => {
  checkUserUid((uid) => {
    const recordsRef = ref(database, `users/${uid}/records`);
    push(recordsRef, payload);
  });
};

export const removeRecord = () => (id) => {
  checkUserUid((uid) => {
    const recordRef = ref(database, `users/${uid}/records/${id}`);
    remove(recordRef);
  });
};

export const updateRecord = () => (payload) => {
  checkUserUid((uid) => {
    const recordRef = ref(database, `users/${uid}/records/${payload.id}`);
    set(recordRef, payload);
  });
};

export const observeRecords = (callback) => {
  checkUserUid((uid) => {
    const recordsRef = ref(database, `users/${uid}/records`);
    onValue(recordsRef, callback);
  });
};

export const getSocialMediaLinks = async () => {
  checkUserUid(async (uid) => {
    const socialMediaLinksRef = ref(database, `users/${uid}/socialMediaLinks`);
    await get(socialMediaLinksRef).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    });
  });
};

export const getSocialMediaAttachment = async () => {
  checkUserUid(async (uid) => {
    const socialMediaAttachmentRef = ref(database, `users/${uid}/socialMediaAttachment`);
    await get(socialMediaAttachmentRef).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    });
  });
};

export const observeInitialBalance = (callback) => {
  checkUserUid((uid) => {
    const InitialBalanceRef = ref(database, `users/${uid}/initialBalance`);
    onValue(InitialBalanceRef, callback);
  });
};

export const updateInitialBalance = () => (payload) => {
  checkUserUid((uid) => {
    const InitialBalanceRef = ref(database, `users/${uid}/initialBalance`);
    set(InitialBalanceRef, payload);
  });
};

export const updateSocialMediaLinks = () => (payload) => {
  checkUserUid((uid) => {
    const socialMediaLinksRef = ref(database, `users/${uid}/socialMediaLinks`);
    set(socialMediaLinksRef, payload);
  });
};

export const updateSocialMediaAttachment = () => (payload) => {
  checkUserUid((uid) => {
    const socialMediaAttachmentRef = ref(database, `users/${uid}/socialMediaAttachment`);
    set(socialMediaAttachmentRef, payload);
  });
};
