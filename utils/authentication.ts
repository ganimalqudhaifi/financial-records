import { auth, signOut } from '../config/firebase';
import { alertToast } from './sweetAlert';

export const userSignOut = () => {
  signOut(auth).catch((error) => {
    alertToast(error.message);
  });
};
