import admin from "firebase-admin";

const config = {
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
};

if (!admin.apps.length) {
  admin.initializeApp(config);
} else {
  admin.app();
}

export const adminAuth = admin.auth();

export async function getUserByUid(uid: string) {
  try {
    const user = await adminAuth.getUser(uid);
    return user.toJSON();
  } catch (error) {
    console.error("Firebase Admin getUser error:", error);
    return null;
  }
}