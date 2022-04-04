const korToEng = {
  '경기': 'gyeonggi',
  '강원': 'gangwon',
  '충청': 'chungcheong',
  '경상': 'gyeongsang',
  '전라': 'jeolla',
  '제주': 'jeju',
  '전체': 'all',
}

const engToKor = {
  'gyeonggi': '경기',
  'gangwon': '강원',
  'chungcheong': '충청',
  'gyeongsang': '경상',
  'jeolla': '전라',
  'jeju': '제주',
  'all': '전체',
}

const dialectsFeature = {
  '경기': '대한민국의 표준어로 다른 방언에 비해 음의 높낮이가 일정합니다.\n대한민국의 가장 많은 인구가 사용하는 방언입니다.',
  '강원': '강원도의 방언은 ~~~',
  '충청': '충청도의 방언은 ~~~',
  '경상': '경상도의 방언은 ~~~',
  '전라': '전라도의 방언은 ~~~',
  '제주': '제주도의 방언은 ~~~',
}

const shareText = `
당신의 말소리 방언을 찾아보세요! 
평소 말투를 분석하여 어느 지방의 방언을 사용하는지 알려주는 서비스입니다!
`

export { korToEng, engToKor, dialectsFeature, shareText }