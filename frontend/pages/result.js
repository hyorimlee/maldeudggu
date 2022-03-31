import Image from '../components/image/image'
import Text from '../components/text/text'
import Button from '../components/button/button'
import ResultProgress from '../containers/progress/resultProgress'

import styles from '../styles/result.module.css'

const dialectsFeature = {
  '서울/경기': '대한민국의 표준어로 다른 방언에 비해 음의 높낮이가 일정합니다.\n대한민국의 가장 많은 인구가 사용하는 방언입니다.',
  '강원': '강원도의 방언은 ~~~',
  '충청': '충청도의 방언은 ~~~',
  '경상': '경상도의 방언은 ~~~',
  '전라': '전라도의 방언은 ~~~',
  '제주': '제주도의 방언은 ~~~',
}

const engToKor = {
  'gyeonggi': '서울/경기',
  'gangwon': '강원',
  'chungcheong': '충청',
  'gyeongsang': '경상',
  'jeolla': '전라',
  'jeju': '제주'
}

function Result({ staticState, changeStaticState }) {
  const myResult = [...staticState.myResult]
  const myNickname = staticState.myNickname

  return (
    <>
      <div className={styles.standContainer}>
        <Image
          type={'result1'}
          path={`/img/character/line/${myResult[0][0]}.png`}
        ></Image>
        <Image
          type={'result2'}
          path={`/img/character/line/${myResult[1][0]}.png`}
        ></Image>
        <Image
          type={'result3'}
          path={`/img/character/line/${myResult[2][0]}.png`}
        ></Image>
        <div className={styles.stand}></div>
      </div>
      <Text size={20} bold contents='테스트 결과'></Text>
      <ResultProgress
        result={[
          [engToKor[myResult[0][0]], parseInt(myResult[0][1])],
          [engToKor[myResult[1][0]], parseInt(myResult[1][1])],
          [engToKor[myResult[2][0]], parseInt(myResult[2][1])]
        ]}>
      </ResultProgress>
      <div>
        <Text
          contents={`
            ${myNickname} 님의 목소리는 ${engToKor[myResult[0][0]]} 방언이 ${parseInt(myResult[0][1])}% 로 주로 사용하시는군요!
            그 외에 ${engToKor[myResult[1][0]]} ${parseInt(myResult[1][1])}%, ${engToKor[myResult[2][0]]} ${parseInt(myResult[2][1])}% 가 나왔습니다.
          `}>
        </Text>
      </div>
      <Text contents={dialectsFeature[engToKor[myResult[0][0]]]}></Text>
      <Button link='/customize' content='내 캐릭터 꾸미기'></Button>
    </>
  )
}

export default Result