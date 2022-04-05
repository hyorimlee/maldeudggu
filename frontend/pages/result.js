import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Image from '../components/image/image'
import Text from '../components/text/text'
import Button from '../components/button/button'
import ResultProgress from '../containers/progress/resultProgress'

import { dialectsFeature, korToEng } from '../modules/locationText'
import styles from '../styles/result.module.css'

function Result({ staticState, changeStaticState }) {
  const router = useRouter()
  const resultKor = Object.keys({ ...staticState.result })

  // 전역 state 값이 비어있으면 404 페이지로 이동
  useEffect(() => {
    if (staticState.caseId === -1 || staticState.sentences.length === 0) {
      router.push({ pathname: '/404', query: { code: '0001' } })
    }
  }, [])

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
          [resultKor[0], parseInt(staticState.result[resultKor[0]])],
          [resultKor[1], parseInt(staticState.result[resultKor[1]])],
          [resultKor[2], parseInt(staticState.result[resultKor[2]])]
        ]}>
      </ResultProgress>
      <div>
        <Text
          contents={`
            ${staticState.nickname} 님의 억양은 ${resultKor[0]}도 방언과의 유사도가 ${staticState.result[resultKor[0]]}% 가장 높아요.
            다음으로 ${resultKor[1]}도 ${staticState.result[resultKor[1]]}%, ${resultKor[2]}도 ${staticState.result[resultKor[2]]}% 순의 결과가 나왔습니다.
          `}>
        </Text>
        <Text contents={dialectsFeature[resultKor[0]]}></Text>
      </div>
      <Button content='내 캐릭터 꾸미기' handler={() => router.push('/customize')}></Button>
    </>
  )
}

export default Result