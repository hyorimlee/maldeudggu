import Text from '../components/text/text'
import Button from '../components/button/button'

import styles from '../styles/result.module.css'

const dialectsFeature = {
  '서울/경기' : '대한민국의 표준어로 다른 방언에 비해 음의 높낮이가 일정합니다.\n대한민국의 가장 많은 인구가 사용하는 방언입니다.',
  '강원' : '',
  '충청' : '',
  '경상' : '',
  '전라' : '',
  '제주' : '',
}

function Result({ staticState, changeStaticState }) {
  return (
    <>
      <>
        퍼센트 시상식
      </>
      <Text size={20} bold contents='테스트 결과'></Text>
      <>
        퍼센트 프로그레스
      </>
      <div>
        <Text contents={`OOO 님의 목소리는 67% 로 경상도 방언을 주로 사용하시는군요! 그 외에 경기 23%, 강원도 10% 가 나왔습니다.`}></Text>
      </div>
      <Text contents={dialectsFeature['서울/경기']}></Text>
      <Button link='/customize' content='내 캐릭터 꾸미기'></Button>
      <Button color='grey' link='' content='결과만 공유하기'></Button>
    </>
  )
}

export default Result