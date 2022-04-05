import { useState, useEffect, useRef, lazy, Suspense } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

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
import { randomDelay } from "../modules/delay"


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
    window.scrollTo(0, 0)
    setShowModal(staticState.reuse)
  }, [staticState.reuse])

  const changeNickname = (event) => {
    if (event.target.value.length && !event.target.value.trim()) {
      alert('시작과 끝에 공백을 넣지 말아주세요.')
    } else if (event.target.value.length > 10) {
      alert('별명이 너무 길어요!')
    } else {
      setNickname(event.target.value)
      changeStaticState('nickname', event.target.value)
    }
  }

  const testStart = async () => {
    // 마이크 접근
    try {
      const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true })
      console.log(audioPermission)
      const response = await postRequest('/start/', [['nickname', nickname.trim()]])      // 닉네임 양끝 공백 제거
      changeStaticState('sentences', response.sentences, 'caseId', response.case_id)

      if (staticState.reuse) {
        let metaData = Object.entries(staticState.metaData).map(data => [data[0], parseInt(data[1])])
        postRequest(`/${response.case_id}/survey/`, metaData).then(
          setDelay(true)
        ).catch(
          setDelay(true)
        )
      } else {
        setDelay(true)
      }
    } catch (error) {
      alert('음성 권한을 허용해주세요')
    }
  }

  useEffect(() => {
    if (staticState.caseId !== -1) {
      randomDelay(2000, 1000, () => router.replace(`/record/${staticState.sentences[0].id}`))
    }
  }, [staticState])

  return (
    <>
      <Head>
        <title>말듣꾸 - AI방언분석</title>
        <meta
          name="description"
          content="말듣꾸는 한국어 사용자의 음성을 인공지능을 통해 분석하여 어느 지방의 사투리를 사용하는지 알려주는 서비스입니다. 내가 평소에 쓰는 억양은 어느 지방의 억양에 가까운지 한 번 알아보세요!"
        />
        <meta name="keywords" content="AI, 사투리, 방언, 음성분석, 캐릭터" />
        <meta property="og:title" content="말듣꾸 - AI방언분석" />
        <meta property="og:description" content="AI 방언분석 서비스 말듣꾸 입니다. 내가 평소에 쓰는 억양은 어느 지방의 억양에 가까운지 한 번 알아보세요!" />
      </Head>
      {delay ? (
        <ThreeDotsWave
          contents='테스트를 준비중이에요.'
        ></ThreeDotsWave>
      ) : (
        <>
          <Text
            bold
            size={16}
            contents={'내 억양은 어느 지역의 사투리와 가장 비슷할까?'}
          ></Text>
          <Image
            type='logo'
            path='/img/logo/logo.png'
          ></Image>
          <Text
            contents={`지금까지 ${participant}명이 참여했어요!`}
          ></Text>
          <Text
            contents={[
              "말듣꾸는 '말하기, 듣기, 꾸미기'의 줄임말로 당신의 억양을 인공지능으로 분석하여 어느 지역의 사투리와 가장 닮아 있는지 알려주는 서비스입니다.",
              <br />,
              '테스트 결과를 확인하고, 각 지역을 모티브로 제작된 캐릭터를 꾸며 공유해보세요.'
            ]}
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
          <Text bold size={16} contents='🎨 다른 유저들의 실시간 말듣꾸' ></Text>
          {
            sharedImages.length
              ? (
                <Suspense fallback={<Text contents='이미지를 불러오고 있어요.'></Text>}>
                  <SharedImages data={sharedImages}></SharedImages>
                </Suspense>
              )
              : <></>
          }
        </>
      )
      }
    </>
  )
}

export default Home;
