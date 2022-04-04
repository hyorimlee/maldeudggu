import { useRouter } from 'next/router'

import Text from '../components/text/text'
import Button from '../components/button/button'
import Image from '../components/image/image'

import styles from '../styles/404.module.css'

function Custom404() {
  const router = useRouter()

  return (
    <>
      <Image type='logo' path='/img/logo/logo.png'></Image>
      <Text size={16} contents='올바르지 못한 접근입니다'></Text>
      <Text size={14} contents='메인 페이지로 이동하여 테스트를 진행해 주세요'></Text>
      <Button content='메인 페이지로 이동하기' handler={() => router.push('/')}></Button>
    </>
  )
}

export default Custom404