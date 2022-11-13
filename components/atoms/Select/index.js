import styles from './Select.module.css';

export default function Select({ style, children, ...rest }) {
  return (
    <>
      <select className={styles[style]} {...rest}>{children}</select>
    </>
  );
}
