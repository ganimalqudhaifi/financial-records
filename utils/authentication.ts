import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/auth";
import { alertToast } from "./sweetAlert";

export const userSignOut = () => {
  signOut(auth).catch((error) => {
    alertToast(error.message);
  });
};
