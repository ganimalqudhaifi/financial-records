import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { FinancialRecords, Footers } from '../../components';
import { useGlobalContext } from '../../context';
import { setRecords, isDemo } from '../../context/action/demoAction';
import { getData } from '../../utils/data';
import styles from './Demo.module.css';

export default function Demo({ records }) {
  const { dispatch } = useGlobalContext();

  useEffect(() => {
    dispatch(isDemo(true));
    dispatch(setRecords(records));
  }, [dispatch, records]);

  return (
    <>
      <Head>
        <title>Financial Records - Demo</title>
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
          <FinancialRecords />
        </div>
        <Footers />
      </div>
      <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />
      <Script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
    </>
  );
}

export function getServerSideProps() {
  const records = getData();
  records.map((record) => {
    record.jenis === 'Penerimaan'
      ? record.value = record.jumlah
      : record.value = record.jumlah * -1;
  });
  return {
    props: {
      records,
    },
  };
}
