import styles from './layout.module.css'

function Layout({ children, nightMode }) {
  return (
    <main className={`${styles.main} ${nightMode ? styles.nightMode : ''}`}>
      {children}
    </main>
  )
}

export default Layout