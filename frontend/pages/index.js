import { useState, useEffect, useRef, lazy, Suspense } from "react"
import { useRouter } from "next/router"

// components & containers
import Text from "../components/text/text"
import Modal from "../containers/modal/modal"
import Image from "../components/image/image"
import Input from "../components/input/input"
import Button from "../components/button/button"
import Checkbox from "../containers/checkbox/checkbox"
import ThreeDotsWave from '../components/loading/loading'
// import SharedImages from '../containers/sharedImages/sharedImages'

// styles
import styles from "../styles/index.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons"

// modules
import { getRequest, postRequest } from '../modules/fetch'
import { stringifyQuery } from "next/dist/server/server-route-utils"


const SharedImages = lazy(() => import('../containers/sharedImages/sharedImages'))

// 공유 이미지 & 참여자 수 가져오기
async function getDatas() {
  const sharedImages = await getRequest('/shared')
  const participant = await getRequest('/participant')

  return {
    sharedImages,
    'participant': participant.count
  }
}

function Home({ staticState, changeStaticState }) {
  const [participant, setParticipant] = useState(0)
  const [sharedImages, setSharedImages] = useState({})
  const [nickname, setNickname] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [delay, setDelay] = useState(false)
  const router = useRouter()
  const body = useRef(null)

  useEffect(() => {
    getDatas()
      .then(response => {
        setParticipant(response.participant)
        setSharedImages(response.sharedImages)
      })
    body.current = document.querySelector('body')
  }, [])

  // (선택) 재사용 동의 체크한 경우 무조건 modal 열리게 & modal 열리면 스크롤 막기
  useEffect(() => {
    staticState.reuse === true ? body.current.classList.add('disableScroll') : body.current.classList.remove('disableScroll')
    setShowModal(staticState.reuse)
  }, [staticState.reuse])

  const changeNickname = (event) => {
    if (event.target.value.length && !event.target.value.trim()) {
      alert('시작과 끝에 공백을 넣지 말아주세요.')
    } else if (event.target.value.length > 10) {
      alert('별명이 너무 길어요!')
    } else {
      setNickname(event.target.value)
    }
  }

  const testStart = async () => {
    // 마이크 접근
    navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
      console.log('User Audio Access Confirmed')
    }).catch(() => {
      console.log('User Audio Access Denied')
      alert('마이크 접근 설정을 허용으로 바꿔주세요.')
    })

    setLoading(true)

    const response = await postRequest('/start/', [['nickname', nickname.trim()]])      // 닉네임 양끝 공백 제거
    changeStaticState('sentences', response.sentences, 'caseId', response.case_id)

    setTimeout(() => {
      setDelay(true)
    }, 1000 + Math.random() * 1000)
  }

  useEffect(() => {
    if (delay === true && staticState.caseId !== -1) {
      router.push(`/record/${staticState.sentences[0].id}`)
    }
  }, [staticState, delay])

  return (
    <>
      <Text
        bold
        size={16}
        contents={'나는 어떤 억양을 사용할까?'}
      ></Text>
      <Image
        type={'logo'}
        path={'/img/logo/logo.png'}
      ></Image>
      <Text
        contents={`지금까지 ${participant}명이 참여했어요!`}
      ></Text>
      <Text
        contents={'말듣꾸는 나의 평소 말투를 인공지능이 분석하여 어느 지방의 억양을 사용하고 있는지 알려주는 서비스입니다.'}
      ></Text>
      <Text
        contents={'테스트 결과를 통해 캐릭터를 꾸미고 공유할 수 있습니다.'}
      ></Text>
      <Input onChange={changeNickname} value={nickname}></Input>
      <Text
        size={12}
        color={'orange'}
        contents={'말듣꾸는 사용자의 발화 분석을 위해 음성 데이터를 수집합니다.'}
      ></Text>
      <Checkbox
        checked={staticState.reuse}
        onChange={() => changeStaticState('reuse', !staticState.reuse)}
        contents={'(선택) 음성 데이터를 추가적인 학습에 활용하는 데 동의합니다.'}
      ></Checkbox>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        staticState={staticState}
        changeStaticState={changeStaticState}
      ></Modal>
      <Button
        content={!nickname ? '별명을 입력해주세요' : '테스트 시작하기'}
        handler={testStart}
        disabled={!nickname}
      ></Button>
      <FontAwesomeIcon
        icon={faAnglesDown}
        className={styles.icon}
      ></FontAwesomeIcon>
      <Text size={16} contents='실시간 생성된 캐릭터' ></Text>
      {
        sharedImages.length
          ? (
            <Suspense fallback={<Text contents='로딩 중... 조금만 기다려주세요'></Text>}>
              <SharedImages data={sharedImages}></SharedImages>
            </Suspense>
          )
          : <></>
      }
    </>
  )
}

export default Home;
