import styles from './image.module.css'

function Image({ path }) {
  return (
    <>
      <img className={styles.image} src={path}></img>
    </>
  )
}

export default Image