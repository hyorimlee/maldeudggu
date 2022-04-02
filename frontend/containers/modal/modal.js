import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from './modal.module.css'

function Modal({ show, onClose }) {
  const [isBrower, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const handleClose = (e) => {
    e.preventDefault()
    onClose()
  }

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.wrapper}>
        <div className={styles.inner} onClick={handleClose}>close 임시~~~</div>
        <div className={styles.inner}>.....</div>
      </div>
    </div>
  ) : null

  if (isBrower) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    )
  } else {
    return null
  }

  // return (
  //   <>
  //     <div className={styles.overlay}>
  //       <div className={styles.wrapper}>
  //         <div className={styles.inner}></div>
  //       </div>
  //     </div>
  //   </>
  // )
}

export default Modal