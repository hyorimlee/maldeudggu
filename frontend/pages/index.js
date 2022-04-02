import { useState } from "react"
import { useRouter } from "next/router"
// components & containers
import Text from "../components/text/text"
import Modal from "../containers/modal/modal"
import Image from "../components/image/image"
import Input from "../components/input/input"
import Button from "../components/button/button"
import Checkbox from "../containers/checkbox/checkbox"
import SharedImages from '../containers/sharedImages/sharedImages'

//styles
import styles from "../styles/index.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons"

import { getRequest } from '../modules/fetch'

import { postRequest } from "../modules/fetch"

// 공유 이미지 & 참여자 수 가져오기
export async function getServerSideProps() {
  const data = await getRequest('/shared')
  const participant = await getRequest('/participant')
  return {
    props: {
      data,
      participant
    }
  }
}

function Home({ staticState, changeStaticState, data, participant = { count: 0 } }) {
  const [use, setUse] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  async function getSampleSentence() {
    const sampleSentence = await postRequest('/start/', [["nickname", "choux"]])
    changeStaticState('sentence', sampleSentence)
    router.push(`${sampleSentence.case_id}`)
  }

  console.log('use', use)
  console.log('reuse', staticState.reuse)

  const useCheckHandler = () => {
    setUse(!use)
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
        contents={`지금까지 ${participant.count}명이 참여했어요!`}
      ></Text>
      <Text
        contents={'말듣꾸는 나의 평소 말투를 인공지능이 분석하여 어느 지방의 억양을 사용하고 있는지 알려주는 서비스입니다.'}
      ></Text>
      <Text
        contents={'테스트 결과를 통해 캐릭터를 꾸미고 공유할 수 있습니다.'}
      ></Text>
      <Input></Input>
      <Checkbox
        checked={use}
        onChange={useCheckHandler}
        contents={'(필수) 음성 데이터 활용에 동의합니다.'}
      ></Checkbox>
      <Checkbox
        checked={staticState.reuse}
        onChange={() => changeStaticState('reuse')}
        contents={'(선택) 음성 데이터를 학습에 활용하는 데 동의합니다.'}
      // 누르면 메타정보용 modal
      ></Checkbox>
      <Button
        content={'테스트 시작하기'}
        handler={getSampleSentence}
        disabled={!use}
      ></Button>
      <button onClick={() => setShowModal(true)}>모달</button>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
      ></Modal>
      <FontAwesomeIcon
        icon={faAnglesDown}
        className={styles.icon}
      ></FontAwesomeIcon>
      <Text size={16} contents='실시간 생성된 캐릭터' ></Text>
      <SharedImages data={data}></SharedImages>
    </>
  )
}

export default Home;
