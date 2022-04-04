import { useState, useEffect, lazy, Suspense } from "react"
import { useRouter } from "next/router"
// components & containers
import Text from "../components/text/text"
import Image from "../components/image/image"
import Input from "../components/input/input"
import Button from "../components/button/button"
import Checkbox from "../containers/checkbox/checkbox"
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
  const [agree, setAgree] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getDatas()
    .then(response => {
      setParticipant(response.participant)
      setSharedImages(response.sharedImages)
    })
  }, [])

  const changeNickname = (event) => {
    if (event.target.value.length && !event.target.value.trim()) {
      alert('시작과 끝에 공백을 넣지 말아주세요')
    } else if (event.target.value.length > 10) {
      alert('별명이 너무 길어요!')
    } else {
      setNickname(event.target.value)
    }
  }

  const checkAgree = () => {
    setAgree(!agree)
  }

  const testStart = async () => {
    const response = await postRequest('/start/', [['nickname', nickname.trim()]])      // 닉네임 양끝 공백 제거
    router.push(`/record/${response.sentences[0].id}`)
    changeStaticState('sentences', response.sentences, 'caseId', response.case_id)
  }

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
      <Checkbox
        checked={agree}
        onChange={checkAgree}
        contents={'(필수) 음성 데이터 수집에 동의합니다. 이건 수집하여 음성 판별에만 사용을 위함'}
      ></Checkbox>
      <Checkbox
        checked={staticState.reuse}
        onChange={() => changeStaticState('reuse', !staticState.reuse)}
        contents={'(선택) 음성 데이터를 수집 및 활용하는 데 동의합니다. 추가적인 학습'}
      ></Checkbox>
      <Button
        content={!agree || !nickname ? '별명 입력과 필수 동의를 눌러주세요' : '테스트 시작하기'}
        handler={testStart}
        disabled={!agree || !nickname}
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
