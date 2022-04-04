import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Text from '../components/text/text'
import Button from '../components/button/button'
import Image from '../components/image/image'

import styles from '../styles/404.module.css'

const NOT_FOUND_CODE = {
  '0000': ['요청하신 페이지가 존재하지 않네요', '접속 주소를 다시 한번 확인해주세요'],
  '0001': ['해당 페이지를 바로 접속할 수 없어요', '메인 페이지에서 시작해주세요'],
  '0002': ['', ''],
}


function Custom404() {
  const [code, setCode] = useState('0000')
  const router = useRouter()
  
  useEffect(() => {
    if (router.query.code) {
      setCode(router.query.code)
    }
  }, [router])

  const texts = NOT_FOUND_CODE[code].map((t, idx) => <Text key={t.slice(0,3) + idx} size={idx === 0 ? 16 : 14} contents={t}></Text>)

  return (
    <>
      <Image type='logo' path='/img/logo/logo.png'></Image>
      {texts}
      <Button content='메인 페이지로 이동하기' handler={() => router.push('/')}></Button>
    </>
  )
}

export default Custom404