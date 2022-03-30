import { useState } from "react"

// components & containers
import Text from "../components/text/text"
import Input from "../components/input/input"
import Button from "../components/button/button"
import Checkbox from "../containers/checkbox/checkbox"
import SharedImages from '../containers/sharedImages/sharedImages'

//styles
import styles from "../styles/index.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons"

import { getRequest } from '../modules/fetch'

/*
사람들 공유 이미지 가져오기
*/
export async function getServerSideProps() {
  const data = await getRequest('/shared')
  
  return {
    props : {
      data
    }
  }
}


function Home({ data }) {
  const [agree, setAgree] = useState(false)

  const checkHandler = () => {
    setAgree(!agree)
  }

  return (
    <>
      <Text
        bold
        size={16}
        contents={'나는 어떤 억양을 사용할까?'}
      ></Text>
      <div className={styles.temp}>로고 자리</div>
      <Text
        contents={'지금까지 nn명이 참여했어요!'}
      ></Text>
      <Text
        contents={'말듣꾸는 나의 평소 말투를 인공지능이 분석하여 어느 지방의 억양을 사용하고 있는지 알려주는 서비스입니다.'}
      ></Text>
      <Text
        contents={'테스트 결과를 통해 캐릭터를 꾸미고 공유할 수 있습니다.'}
      ></Text>
      <Input></Input>
      <Checkbox
        checked={agree}
        onChange={checkHandler}
        contents={'음성 데이터 수집에 동의합니다.'}
      ></Checkbox>
      <Button
        link={''}
        content={'테스트 시작하기'}
        disabled={!agree}
      ></Button>
      <FontAwesomeIcon
        icon={faAnglesDown}
        className={styles.icon}
      ></FontAwesomeIcon>
      <SharedImages data={data}></SharedImages>
    </>
  )
}

export default Home;
