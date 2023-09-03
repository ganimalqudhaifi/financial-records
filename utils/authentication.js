import { auth, onAuthStateChanged, signOut } from '../config/firebase';
import { alertToast } from './sweetAlert';

export const checkUserAuth = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export const checkUserUid = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user.uid);
    }
  });
};

export const userSignOut = () => {
  signOut(auth).catch((error) => {
    alertToast(error.message);
  });
};
