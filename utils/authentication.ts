import { auth } from "../config/firebase";
import { alertToast } from "./sweetAlert";
import { signOut } from "firebase/auth";

export const userSignOut = () => {
  signOut(auth).catch((error) => {
    alertToast(error.message);
  });
};
