import React, { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
        <div className="flex flex-col w-full h-full bg-gray-200">
          <div className="lg:flex flex-1">
            <AppSidebar />
            <div className="w-full p-4 lg:ml-64 overflow-auto">
              <h2 className="font-medium text-3xl mb-4">Table</h2>
              <FinancialRecords />
            </div>
          </div>
          <div className="lg:ml-64">
            <Footers />
          </div>
        </div>
      </>
    );
  }
}
