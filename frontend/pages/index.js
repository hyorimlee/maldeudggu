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
import { faAnglesDown, faSun, faMoon } from "@fortawesome/free-solid-svg-icons"

// modules
import { getRequest, postRequest } from '../modules/fetch'
import { stringifyQuery } from "next/dist/server/server-route-utils"
import { randomDelay } from "../modules/delay"


const SharedImages = lazy(() => import('../containers/sharedImages/sharedImages'))

// 공유 이미지 & 참여자 수 가져오기
async function getDatas() {
  const sharedImages = await getRequest('/shared')
  const participant = await getRequest('/participant')

  if (sharedImages === null || participant === null) {
    throw '0502'
  }

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
      .catch((code) => {
        router.push({ pathname: '/404', query: { code } })
      })
    body.current = document.querySelector('body')

    if (navigator.userAgent.indexOf("Chrome") > -1) {
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        alert('말듣꾸 방언분석 서비스는 Safari 환경에 최적화 되어 있습니다. 가능하다면 Safari를 통해 접속해주세요!')
      }
    } else if (navigator.userAgent.indexOf("Safari") > -1) {
      if (/Android/i.test(navigator.userAgent)) {
        alert('말듣꾸 방언분석 서비스는 Chrome 환경에 최적화 되어 있습니다. 가능하다면 Chrome을 통해 접속해주세요!')
      }
    }
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

  const handleNightMode = () => {
    changeStaticState('settings', !staticState.settings.nightMode, 'nightMode')
  }

  const testStart = async () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(() => {
      postRequest('/start/', [['nickname', nickname.trim()]])
      .then((response) => {
        changeStaticState('sentences', response.sentences, 'caseId', response.case_id)

        if (staticState.reuse) {
          let metaData = Object.entries(staticState.metaData).map(data => [data[0], parseInt(data[1])])
          postRequest(`/${response.case_id}/survey/`, metaData)
          .then(
            setDelay(true)
          )
        } else {
          setDelay(true)
        }
      })
      .catch(() => {
        router.push({ pathname: '/404', query: { code: '0502' } })
      })
    })
    .catch(() => {
      alert('음성 권한을 허용해주세요')
    })
  }

  useEffect(() => {
    if (staticState.caseId !== -1) {
      randomDelay(500, 1000, () => router.replace(`/record/${staticState.sentences[0].id}`))
    }
  }, [staticState])

  return (
    <>
      {delay ? (
        <ThreeDotsWave
          contents='테스트를 준비중이에요.'
        ></ThreeDotsWave>
      ) : (
        <>
          <div className={styles.index__container}>
            <Text
              bold
              size={16}
              contents={'내 억양은 어느 지역의 사투리와 가장 비슷할까?'}
            ></Text>
            <div>
              <Image
                type='logo'
                path='/img/logo/logo.png'
              ></Image>
              {staticState.settings.nightMode ?
                <FontAwesomeIcon
                icon={faSun}
                className={styles.nightModeButton}
                onClick={handleNightMode}
                ></FontAwesomeIcon>
                :
                <FontAwesomeIcon
                icon={faMoon}
                className={styles.nightModeButton}
                onClick={handleNightMode}
              ></FontAwesomeIcon>
              }
            </div>
            <div className={styles.participant}>
              <Text inline contents={'지금까지 '}></Text>
              <Text inline color={'orange'} size={18} font contents={participant}></Text>
              <Text inline contents={'명이 참여했어요!'}></Text>
            </div>
            <Text
              contents={[
                "말듣꾸는 '말하기, 듣기, 꾸미기'의 줄임말로 당신의 억양을 인공지능으로 분석하여 어느 지역의 사투리와 가장 닮아 있는지 알려주는 서비스입니다.",
                <br key="1" />,
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
              contents={'(선택) 음성 데이터를 학습에 활용하는 데 동의합니다.'}
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
          </div>
          <article className={`${styles.sharedImages__container} ${staticState.settings.nightMode ? styles.nightMode : ''}`}>
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
          </article>
        </>
      )
      }
    </>
  )
}

export default Home;
