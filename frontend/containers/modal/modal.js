import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import Text from '../../components/text/text'
import Select from '../../components/select/select'
import Button from '../../components/button/button'

import styles from './modal.module.css'

const GENDER = [
  { value: 'man', name: '남자' },
  { value: 'woman', name: '여자' },
]

const AGE = [
  { value: 10, name: '10대' },
  { value: 20, name: '20대' },
  { value: 30, name: '30대' },
  { value: 40, name: '40대' },
  { value: 50, name: '50대 이상' },
]

const BIRTHLOCATION = [
  { value: 'gyeonggi', name: '경기' },
  { value: 'gangwon', name: '강원' },
  { value: 'chungcheong', name: '충청' },
  { value: 'jeolla', name: '전라' },
  { value: 'gyeongsang', name: '경상' },
  { value: 'jeju', name: '제주' },
  { value: 'unknown', name: '모름' },
]

const LOCATION = [
  { value: 'gyeonggi', name: '경기' },
  { value: 'gangwon', name: '강원' },
  { value: 'chungcheong', name: '충청' },
  { value: 'jeolla', name: '전라' },
  { value: 'gyeongsang', name: '경상' },
  { value: 'jeju', name: '제주' },
  { value: 'no', name: '없음' },
]

function Modal({ show, onClose, staticState, changeStaticState }) {
  const [isBrower, setIsBrowser] = useState(false)
  // 여기 기본값 null로 해놓기 vs 미리 지정해두기...
  const [metaData, setMetaData] = useState({
    gender: 'man',
    age: 10,
    birthLocation: 'gyeonggi',
    location: 'gyeonggi'
  })

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const changeMetaData = (type, data) => {
    let newMetaData = { ...metaData }
    newMetaData[type] = data
    setMetaData(newMetaData)
  }

  const saveAndClose = () => {
    changeStaticState('metaData', metaData)
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
          <Text size={12} contents={'1. 성별/나이를 알려주세요.'}></Text>
          <Select name={'gender'} id={'gender'} options={GENDER} onChange={changeMetaData}></Select>
          <Select name={'age'} options={AGE} onChange={changeMetaData}></Select>
          <Text size={12} contents={'2. 출생 지역을 알려주세요.'}></Text>
          <Select name={'birthLocation'} options={BIRTHLOCATION} onChange={changeMetaData}></Select>
          <Text size={12} contents={'3. 10년 이상 거주했던 지역이 있다면 알려주세요.'}></Text>
          <Select name={'location'} options={LOCATION} onChange={changeMetaData}></Select>
          <Button
            content={'저장하고 테스트 시작하기'}
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