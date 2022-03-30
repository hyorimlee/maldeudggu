import styles from "./checkbox.module.css"
import Text from "../../components/text/text"

function Checkbox({ checked, onChange, contents }) {
  return (
    <div className={styles.container}>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
        ></input>
        <svg viewBox="0 0 21 21">
          <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
        </svg>
      </label>
      <Text
        size={12}
        contents={contents}
      ></Text>
    </div>
  )
}

export default Checkbox