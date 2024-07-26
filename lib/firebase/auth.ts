import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { DataUser } from "@/types";
import admin from "./admin";
import { app } from "./client";

// client
const auth = getAuth(app);

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    throw error;
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
    throw error;
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};

export const getUser = async (uid: string): Promise<DataUser> => {
  try {
    const userRecord = await admin.auth().getUser(uid);
    return userRecord.toJSON() as DataUser;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (uid: string) => {
  try {
    if (auth.currentUser !== null) {
      await updateProfile(auth.currentUser, {
        displayName: `user${uid.substring(0, 11)}`,
        photoURL: "/avatar/boy_01.svg",
      });
    }
  } catch (error) {
    throw error;
  }
};
