import { updateProfile } from 'firebase/auth';
import Head from 'next/head';
import { useContext } from 'react';
import { Footers } from '../../../components';
import { auth } from '../../../config/firebase';
import { RootContext } from '../../../context';
import { changeUser } from '../../../context/action/demoAction';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { dispatch, state } = useContext(RootContext);
  const { user } = state;

  return (
    <>
      <Head>
        <title>Financial Records - App</title>
      </Head>
      <div className={styles.body}>
        <div className={styles.header}>
          <h1 className="text-3xl font-semibold my-6">Dashboard</h1>
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
        <Footers />
      </div>
    </>
  );
}
