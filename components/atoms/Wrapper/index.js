import styles from './Wrapper.module.css';

export default function Wrapper({ style, children }) {
  return (
    <>
      <div className={styles[style]}>
        {children}
      </div>
    </>
  );
}
