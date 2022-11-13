import styles from './Button.module.css';

export default function Button({ title, style, ...rest }) {
  return (
    <>
      <button className={styles[style]} {...rest}>{title}</button>
    </>
  );
}
