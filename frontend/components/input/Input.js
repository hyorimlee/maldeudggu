import styles from './Input.module.css';

function Input() {
  return (
    <>
      <label htmlFor="nickname" className={styles.inputLabel}>당신의 이름을 알려주세요.</label>
      <input
        type="text"
        id="nickname"
        placeholder="nickname"
        className={styles.input}
      ></input>
    </>
  )
}

export default Input;