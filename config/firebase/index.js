import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {
  getDatabase, ref, set, push, remove, onValue,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAvrAGVwIl28CWZ7TIrqn8f966MyWUnvRE',
  authDomain: 'financial-records-firebase.firebaseapp.com',
  projectId: 'financial-records-firebase',
  storageBucket: 'financial-records-firebase.appspot.com',
  messagingSenderId: '53898876663',
  appId: '1:53898876663:web:44c8362f53910ca13765f2',
  measurementId: 'G-RJD9696EFB',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app, 'https://financial-records-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/');
export {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, ref, set, push, remove, onValue,
};
