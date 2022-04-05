import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import Text from '../../components/text/text'
import Select from '../../components/select/select'
import Button from '../../components/button/button'

import styles from './modal.module.css'

const GENDER = [
  { value: 0, name: '남자' },
  { value: 1, name: '여자' },
]

const AGE = [
  { value: 10, name: '10대' },
  { value: 20, name: '20대' },
  { value: 30, name: '30대' },
  { value: 40, name: '40대' },
  { value: 50, name: '50대 이상' },
]

const BIRTHLOCATION = [
  { value: 1, name: '경기' },
  { value: 2, name: '강원' },
  { value: 3, name: '충청' },
  { value: 4, name: '전라' },
  { value: 5, name: '경상' },
  { value: 6, name: '제주' },
  { value: 0, name: '모름' },
]

const LOCATION = [
  { value: 1, name: '경기' },
  { value: 2, name: '강원' },
  { value: 3, name: '충청' },
  { value: 4, name: '전라' },
  { value: 5, name: '경상' },
  { value: 6, name: '제주' },
  { value: 0, name: '없음' },
]

function Modal({ show, onClose, staticState, changeStaticState }) {
  const [isBrower, setIsBrowser] = useState(false)
  // 여기 기본값 null로 해놓기 vs 미리 지정해두기...
  const [metaData, setMetaData] = useState({
    gender: 0,
    age: 10,
    birthLocation: 1,
    location: 1
  })

  const body = useRef(null)

  useEffect(() => {
    setIsBrowser(true)
    body.current = document.querySelector('body')
  }, [])

  const changeMetaData = (type, data) => {
    let newMetaData = { ...metaData }
    newMetaData[type] = data
    setMetaData(newMetaData)
  }

  const saveAndClose = () => {
    changeStaticState('metaData', metaData)
    body.current.classList.remove('disableScroll')
    onClose()
  }

  const justClose = () => {
    changeStaticState('reuse', !staticState.reuse)
    onClose()
  }

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.wrapper} tabIndex="-1">
        <div className={styles.inner} tabIndex="0">
          <Text
            size={12}
            contents={'인공지능 모델 재학습을 위하여 발화자의 정보를 수집하고 있어요.'}
          ></Text>
          <Text size={12} contents={'1. 성별과 나이를 알려주세요.'}></Text>
          <Select name={'gender'} id={'gender'} options={GENDER} onChange={changeMetaData}></Select>
          <Select name={'age'} options={AGE} onChange={changeMetaData}></Select>
          <Text size={12} contents={'2. 출생 지역을 알려주세요.'}></Text>
          <Select name={'birthLocation'} options={BIRTHLOCATION} onChange={changeMetaData}></Select>
          <Text size={12} contents={'3. 10년 이상 거주했던 지역이 있다면 알려주세요.'}></Text>
          <Select name={'location'} options={LOCATION} onChange={changeMetaData}></Select>
          <Button
            content={'저장하고 닫기'}
            handler={saveAndClose}
          ></Button>
          <Button
            color={'grey'}
            content={'닫기'}
            handler={justClose}
          ></Button>
        </div>
      </div>
    </div >
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