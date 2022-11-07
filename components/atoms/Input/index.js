import styles from './Input.module.css'

export default function Input({style, ...rest}) {
  return (
    <>
    <input className={styles[style]} {...rest}/>
    </>
  )
}