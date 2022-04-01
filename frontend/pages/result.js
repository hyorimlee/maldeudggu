import Image from '../components/image/image'
import Text from '../components/text/text'
import Button from '../components/button/button'
import ResultProgress from '../containers/progress/resultProgress'

import styles from '../styles/result.module.css'

const dialectsFeature = {
  '경기': '대한민국의 표준어로 다른 방언에 비해 음의 높낮이가 일정합니다.\n대한민국의 가장 많은 인구가 사용하는 방언입니다.',
  '강원': '강원도의 방언은 ~~~',
  '충청': '충청도의 방언은 ~~~',
  '경상': '경상도의 방언은 ~~~',
  '전라': '전라도의 방언은 ~~~',
  '제주': '제주도의 방언은 ~~~',
}

const engToKor = {
  'gyeonggi': '경기',
  'gangwon': '강원',
  'chungcheong': '충청',
  'gyeongsang': '경상',
  'jeolla': '전라',
  'jeju': '제주'
}

const korToEng = {
  '경기' : 'gyeonggi',
  '강원' : 'gangwon',
  '충청' : 'chungcheong',
  '경상' : 'gyeongsang',
  '전라' : 'jeolla',
  '제주' : 'jeju'
}

function Result({ staticState, changeStaticState }) {
  const resultKor = Object.keys({ ...staticState.myResult.result })
  const myNickname = staticState.myNickname

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
          [resultKor[0], parseInt(staticState.myResult.result[resultKor[0]])],
          [resultKor[1], parseInt(staticState.myResult.result[resultKor[1]])],
          [resultKor[2], parseInt(staticState.myResult.result[resultKor[2]])]
        ]}>
      </ResultProgress>
      <div>
        <Text
          contents={`
            ${myNickname} 님의 목소리는 ${resultKor[0]} 방언이 ${parseInt(staticState.myResult.result[resultKor[0]])}% 로 주로 사용하시는군요!
            그 외에 ${resultKor[1]} ${parseInt(staticState.myResult.result[resultKor[1]])}%, ${resultKor[2]} ${parseInt(staticState.myResult.result[resultKor[2]])}% 가 나왔습니다.
          `}>
        </Text>
      </div>
      <Text contents={dialectsFeature[resultKor[0]]}></Text>
      <Button link='/customize' content='내 캐릭터 꾸미기'></Button>
    </>
  )
}

export default Result