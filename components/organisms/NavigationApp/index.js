import Link from 'next/link';
import Script from 'next/script';
import styles from './NavigationApp.module.css';

export default function NavigationApp() {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.navigation}>
          <ul>
            <li>
              <Link href="/">
                <span className={styles.icon}><ion-icon name="wallet" /></span>
                <span className={styles.title}>Financial Records</span>
              </Link>
            </li>
            <li>
              <Link href="/app/dashboard">
                <span className={styles.icon}><ion-icon name="pie-chart-outline" /></span>
                <span className={styles.title}>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/app">
                <span className={styles.icon}><ion-icon name="apps-outline" /></span>
                <span className={styles.title}>Table</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                onClick={() => {
                  localStorage.removeItem('uid');
                  sessionStorage.removeItem('uid');
                }}
              >
                <span className={styles.icon}><ion-icon name="log-out-outline" /></span>
                <span className={styles.title}>Sign Out</span>
              </Link>
            </li>
          </ul>
          <div
            className={styles.toggle}
            onClick={() => {
              document.querySelector(`.${styles.navigation}`).classList.toggle(styles.active);
              document.querySelector(`.${styles.body}`).classList.toggle(styles.blurred);
            }}
          />
        </div>
      </div>
      <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />
      <Script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
    </>
  );
}
