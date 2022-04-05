import styles from './input.module.css';

function Input({ value, onChange }) {
  return (
    <>
      <label htmlFor="nickname" className={styles.inputLabel}>당신의 별명을 알려주세요.</label>
      <input
        type="text"
        id="nickname"
        placeholder="그대로 불러드릴게요."
        className={styles.input}
        value={value}
        onChange={onChange}
      ></input>
    </>
  )
}

export default Input;