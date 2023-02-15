import React, { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from './App.module.css';
import { AppSidebar, FinancialRecords, Footers } from '../../components';
import { RootContext } from '../../context';
import { setRecords, isDemo, changeUser } from '../../context/action/demoAction';
import {
  database, ref, onValue, onAuthStateChanged, auth, updateProfile,
} from '../../config/firebase';

export default function App() {
  const { state, dispatch } = useContext(RootContext);
  const { user } = state;
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    dispatch(isDemo(false));
    let uid = localStorage.getItem('uid');
    if (uid === null) {
      uid = sessionStorage.getItem('uid');
      (uid !== null) ? setIsLogin(true) : router.push('/login');
    } else {
      setIsLogin(true);
    }
    if (!user.displayName) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const dataUser = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
          };
          dispatch(changeUser(dataUser));
        }
      });
      if (user.displayName === null) {
        updateProfile(auth.currentUser, {
          displayName: 'username',
        });
      }
    }
    const recordsRef = ref(database, `records/${JSON.parse(uid)}`);
    onValue(recordsRef, (snapshot) => {
      const data = [];
      snapshot.exists() && Object.keys(snapshot.val()).map((key) => {
        data.push({
          ...snapshot.val()[key],
          id: key,
        });
      });
      dispatch(setRecords(data));
    });
  }, [dispatch, router, user]);

  if (isLogin) {
    return (
      <>
        <Head>
          <title>Financial Records - App</title>
        </Head>
        <div className={styles.body}>
          <div className={styles.header}>
            <h1 className="text-3xl font-semibold my-6">Table</h1>
            <div className="flex items-center space-x-1">
              <input
                type="text"
                className="text-xl font-semibold px-1 rounded text-right hover:bg-slate-200 hover:outline hover:outline-2 hover:outline-slate-300 focus:bg-transparent focus:outline-slate-800"
                onMouseEnter={(e) => {
                  e.target.style.width = `${e.target.value.length + 1}ch`;
                }}
                onChange={(e) => {
                  dispatch(changeUser({ ...user, displayName: e.target.value }));
                  updateProfile(auth.currentUser, {
                    displayName: e.target.value,
                  });
                  e.target.style.width = `${e.target.value.length + 1}ch`;
                }}
                value={user.displayName}
                maxLength={20}
                contentEditable
                spellCheck={false}
              />
              <span className={styles.icon}><ion-icon name="person-circle-outline" /></span>
            </div>
          </div>
          <div className={styles['app-main']}>
            <AppSidebar />
            <FinancialRecords />
          </div>
          <Footers />
        </div>
      </>
    );
  }
}
