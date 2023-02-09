import styles from './Table.module.css';

export default function Table({ style, children, ...rest }) {
  return (
    <table className={styles[style]} {...rest}>
      {children}
    </table>
  );
}
