import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import Text from '../../components/text/text'

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
        <div className={styles.inner}>
          <Text contents={'1. 성별/나이를 알려주세요.'}></Text>
          <Text contents={'2. 출생 지역을 알려주세요.'}></Text>
          <Text contents={'3. 10년 이상 거주했던 지역이 있다면 알려주세요.'}></Text>
        </div>
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
}

export default Modal