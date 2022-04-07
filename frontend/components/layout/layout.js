import styles from './layout.module.css'

function Layout({ children, nightMode }) {
  return (
    <div className={`${styles.container} ${nightMode ? styles.nightMode : ''}`}>
      {children}
    </div>
  )
}

export default Layout