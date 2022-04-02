import { useRouter } from 'next/router'
import Image from '../components/image/image'
import Text from '../components/text/text'
import Button from '../components/button/button'
import ResultProgress from '../containers/progress/resultProgress'

import { dialectsFeature, korToEng } from '../modules/locationText' 
import styles from '../styles/result.module.css'

function Result({ staticState, changeStaticState }) {
  const resultKor = Object.keys({ ...staticState.result.result })
  const router = useRouter()
  const nickname = staticState.nickname

  const routeCustomize = () => {
    router.push('/customize')
  }

  return (
    <>
      <div className={styles.standContainer}>
        <Image
          type={'result1'}
          path={`/img/character/line/${korToEng[resultKor[0]]}-line.svg`}
        ></Image>
        <Image
          type={'result2'}
          path={`/img/character/line/${korToEng[resultKor[1]]}-line.svg`}
        ></Image>
        <Image
          type={'result3'}
          path={`/img/character/line/${korToEng[resultKor[2]]}-line.svg`}
        ></Image>
        <div className={styles.stand}></div>
      </div>
      <Text size={20} bold contents='테스트 결과'></Text>
      <ResultProgress
        result={[
          [resultKor[0], parseInt(staticState.result.result[resultKor[0]])],
          [resultKor[1], parseInt(staticState.result.result[resultKor[1]])],
          [resultKor[2], parseInt(staticState.result.result[resultKor[2]])]
        ]}>
      </ResultProgress>
      <div>
        <Text
          contents={`
            ${myNickname} 님의 목소리는 ${resultKor[0]} 방언이 ${parseInt(staticState.result.result[resultKor[0]])}% 로 주로 사용하시는군요!
            그 외에 ${resultKor[1]} ${parseInt(staticState.myResult.result[resultKor[1]])}%, ${resultKor[2]} ${parseInt(staticState.myResult.result[resultKor[2]])}% 가 나왔습니다.
          `}>
        </Text>
      </div>
      <Text contents={dialectsFeature[resultKor[0]]}></Text>
      <Button content='내 캐릭터 꾸미기' handler={routeCustomize}></Button>
    </>
  )
}

export default Result