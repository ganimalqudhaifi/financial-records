import React, { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from './App.module.css';
import { FinancialRecords, Footers } from '../../components';
import { RootContext } from '../../context';
import { setRecords, isDemo } from '../../context/action/demoAction';
import { database, ref, onValue } from '../../config/firebase';
import NavigationApp from '../../components/organisms/NavigationApp';

export default function App() {
  const { dispatch } = useContext(RootContext);
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
  }, [dispatch, router]);

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
              <span className="text-xl font-semibold">username</span>
              <span className={styles.icon}><ion-icon name="person-circle-outline" /></span>
            </div>
          </div>
          <div className={styles['app-main']}>
            <NavigationApp />
            <FinancialRecords />
          </div>
          <Footers />
        </div>
      </>
    );
  }
}
