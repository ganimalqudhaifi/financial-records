import { auth, onAuthStateChanged, signOut } from '../config/firebase';
import { alertToast } from './sweetAlert';

export const checkUserAuth = (callback) => {
  onAuthStateChanged(auth, (user) => {
    // console.log('this massage from onAuthStateChanged');
    // TODO: need to unsubscribe
    callback(user);
  });
};

export const checkUserUid = (callback) => {
  onAuthStateChanged(auth, (user) => {
    // console.log('this massage from checkUserUid');
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
