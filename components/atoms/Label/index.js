import styles from './Label.module.css';

export default function Label({ style, title, ...rest }) {
  return (
    <label className={styles[style]} {...rest}>{title}</label>
  );
}
