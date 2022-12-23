import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import { FinancialRecords, Footers } from '../../components';
import { RootContext } from '../../context';
import { setRecords, isDemo } from '../../context/action/demoAction';
import { getData } from '../../utils/data';
import styles from './Demo.module.css';

export default function Demo({ records }) {
  const { dispatch } = useContext(RootContext);

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
