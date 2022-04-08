import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Text from '../components/text/text'
import Button from '../components/button/button'
import Image from '../components/image/image'

import styles from '../styles/404.module.css'

const NOT_FOUND_CODE = {
  '0000': ['요청하신 페이지가 존재하지 않아요.', <br key={1} />, '접속 주소를 다시 한번 확인해주세요.'],
  '0001': ['해당 페이지를 바로 접속할 수 없어요.', <br key={1} />, '메인 페이지에서 시작해주세요.'],
  '0002': ['찾으시는 결과가 존재하지 않아요.', <br key={1} />, '접속 주소를 다시 한번 확인해주세요.'],
  '0003': ['음성 녹음 장치에 문제가 있어요', <br key={1} />, '브라우저를 종료 후 다시 시도해주세요'],
  '0502': ['서버에서 문제가 있어요.', <br key={1} />, '잠시후에 다시 시도해주세요.'],
}


function Custom404() {
  const [code, setCode] = useState('0000')
  const router = useRouter()
  
  useEffect(() => {
    if (router.query.code) {
      setCode(router.query.code)
    }
  }, [router])

  return (
    <main className={styles.container}>
      <Image type='logo' path='/img/logo/logo.png'></Image>
      <Text contents={NOT_FOUND_CODE[code]}></Text>
      <Button content='메인 페이지로 이동하기' handler={() => router.push('/')}></Button>
    </main>
  )
}

export default Custom404