import styles from './sns.module.css'

function SNS({ type, onClick }) {
  return (
    <>
      <i id={type} className={`${styles.icon} ${styles[type]}`} onClick={onClick}></i>
    </>
  )
}

export default SNS