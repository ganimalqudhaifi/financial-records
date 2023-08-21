import Link from 'next/link';
import styles from './Headers.module.css';
import { useGlobalContext } from '../../../context';

export default function Headers() {
  const { state } = useGlobalContext();
  const { isDemo } = state;

  return (
    <div>
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
    </div>
  );
}
