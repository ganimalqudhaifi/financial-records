import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { DataUser } from "@/shared/types";
import { handleAuthError } from "@/shared/utils/getErrorMessage";
import { app } from "@/lib/firebase/client";

export const auth = getAuth(app);

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    const errorMsg = handleAuthError(error as FirebaseError);
    throw new Error(errorMsg);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    const errorMsg = handleAuthError(error as FirebaseError);
    throw new Error(errorMsg);
  }
};

export const signOut = async () => {
  await auth.signOut();
};

export const updateUser = async (uid: string) => {
  try {
    if (auth.currentUser !== null) {
      await updateProfile(auth.currentUser, {
        displayName: `user${uid.substring(0, 11)}`,
        photoURL: "/avatar/boy_01.svg",
      });
    }
  } catch (error) { console.error("Update user failed:", error); }
};