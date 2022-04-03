import styles from './select.module.css'

function Select({ name, options, id, onChange }) {

  const handleChange = (e) => {
    onChange(name, e.target.value)
  }

  return (
    <select className={styles.select} name={name} id={id} onChange={(e) => handleChange(e)}>
      {options.map(option => {
        return <option className={styles.option} key={option.value} value={option.value}>{option.name}</option>
      })}
    </select>
  )
}

export default Select