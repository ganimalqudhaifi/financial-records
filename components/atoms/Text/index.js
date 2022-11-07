import styles from './Text.module.css'

export default function Text({style, title}) {
  return (
    <>
    <p className={styles[style]}>{title}</p>
    </>
  )
}