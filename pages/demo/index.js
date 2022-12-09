import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import { FinancialRecords } from '../../components';
import { RootContext } from '../../context';
import { setRecords, isDemo } from '../../context/action/demoAction';
import { getData } from '../../utils/data';

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
      <FinancialRecords />
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
