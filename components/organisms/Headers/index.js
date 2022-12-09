import Link from 'next/link';
import React, { useContext } from 'react';
import styles from './Headers.module.css';
import { Wrapper } from '../../atoms';
import { RootContext } from '../../../context';

export default function Headers() {
  const { state } = useContext(RootContext);
  const { isDemo } = state;

  return (
    <>
      <Wrapper style="auto-layout-col">
        {
          isDemo
            ? <h1 className={styles.title}>Demo</h1>
            : <h1 className={styles.title}>User</h1>
        }
        <ul>
          <li>
            {
              isDemo
                ? (
                  <Link href="/app">
                    Get Started
                  </Link>
                )
                : (
                  <Link
                    href="/"
                    onClick={() => {
                      localStorage.removeItem('uid');
                      sessionStorage.removeItem('uid');
                    }}
                  >
                    Logout
                  </Link>
                )
              }
          </li>
        </ul>
      </Wrapper>
    </>
  );
}
