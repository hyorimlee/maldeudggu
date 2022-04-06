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
  '경기': "경기도 방언은 부드럽고 다정한 어투가 특징이에요. 타 지역 방언에 비해 비교적 단조롭고 끝이 올라가는 경우가 많아요. 경기 방언에서는 대화문에서 일종의 접속사처럼 말끝에 '~요'를 붙이는 경향이 있습니다.",
  '강원': "강원도 방언은 억센 듯하면서도 율동적인 특징을 가지고 있어요. 그 이유는 말의 길이와 높낮이에 따라 뜻이 달라지는 단어가 많기 때문이에요.",
  '충청': "충청도 방언의 말투는 온화하며 억양이 차분한 것이 특징이에요. 지리적 특성 때문에 경기 방언과 대체로 비슷하지만 남부로 내려갈수록 전라도 방언과의 유사성을 보여요. 말 자체가 느리다기보다는 말끝을 늘리는 경향이 있습니다.",
  '전라': "전라도 방언은 비음을 내는 어미가 많아 부드럽다는 인상을 줘요. 모음의 길이를 길게 발음하고 의문문 어미의 음을 내려서 말한다는 특징이 있어요.",
  '경상': "경상도 방언은 문장의 끝에서 억양이 완만히 하강하는 특징을 가지고 있어요. 표준어와 비교하면 의문문에서 이 차이가 두드러집니다. 음절의 고저 악센트가 두드러져 억양이 강하게 느껴지기도 해요.",
  '제주': "제주도 방언은 짧은 낱말에서는 뒤를 강조하고, 비교적 긴 낱말에서는 두 번째 음절을 강조하는 특징을 가지고 있어요. 서술문과 의문문의 끝을 내리는 경우도 있어 무뚝뚝하게 느껴지기도 해요. 전형적인 제주 방언은 표준어보다 다양한 억양 패턴을 가지고 있는 편입니다.",
}

const shareText = `
당신의 말소리 방언을 찾아보세요! 
평소 말투를 분석하여 어느 지방의 방언을 사용하는지 알려주는 서비스입니다!
`


const locationComb = {
  'gangwon': [
    [ 'gangwon', 'chungcheong', 'gyeonggi' ],
    [ 'gangwon', 'chungcheong', 'gyeongsang' ],
    [ 'gangwon', 'chungcheong', 'jeju' ],
    [ 'gangwon', 'chungcheong', 'jeolla' ],
    [ 'gangwon', 'gyeonggi', 'gyeongsang' ],
    [ 'gangwon', 'gyeonggi', 'jeju' ],
    [ 'gangwon', 'gyeonggi', 'jeolla' ],
    [ 'gangwon', 'gyeongsang', 'jeju' ],
    [ 'gangwon', 'gyeongsang', 'jeolla' ],
    [ 'gangwon', 'jeju', 'jeolla' ]
  ],
  'chungcheong': [
    [ 'chungcheong', 'gangwon', 'gyeonggi' ],
    [ 'chungcheong', 'gangwon', 'gyeongsang' ],
    [ 'chungcheong', 'gangwon', 'jeju' ],
    [ 'chungcheong', 'gangwon', 'jeolla' ],
    [ 'chungcheong', 'gyeonggi', 'gyeongsang' ],
    [ 'chungcheong', 'gyeonggi', 'jeju' ],
    [ 'chungcheong', 'gyeonggi', 'jeolla' ],
    [ 'chungcheong', 'gyeongsang', 'jeju' ],
    [ 'chungcheong', 'gyeongsang', 'jeolla' ],
    [ 'chungcheong', 'jeju', 'jeolla' ]
  ],
  'gyeonggi': [
    [ 'gyeonggi', 'gangwon', 'chungcheong' ],
    [ 'gyeonggi', 'gangwon', 'gyeongsang' ],
    [ 'gyeonggi', 'gangwon', 'jeju' ],
    [ 'gyeonggi', 'gangwon', 'jeolla' ],
    [ 'gyeonggi', 'chungcheong', 'gyeongsang' ],
    [ 'gyeonggi', 'chungcheong', 'jeju' ],
    [ 'gyeonggi', 'chungcheong', 'jeolla' ],
    [ 'gyeonggi', 'gyeongsang', 'jeju' ],
    [ 'gyeonggi', 'gyeongsang', 'jeolla' ],
    [ 'gyeonggi', 'jeju', 'jeolla' ]
  ],
  'gyeongsang': [
    [ 'gyeongsang', 'gangwon', 'chungcheong' ],
    [ 'gyeongsang', 'gangwon', 'gyeonggi' ],
    [ 'gyeongsang', 'gangwon', 'jeju' ],
    [ 'gyeongsang', 'gangwon', 'jeolla' ],
    [ 'gyeongsang', 'chungcheong', 'gyeonggi' ],
    [ 'gyeongsang', 'chungcheong', 'jeju' ],
    [ 'gyeongsang', 'chungcheong', 'jeolla' ],
    [ 'gyeongsang', 'gyeonggi', 'jeju' ],
    [ 'gyeongsang', 'gyeonggi', 'jeolla' ],
    [ 'gyeongsang', 'jeju', 'jeolla' ]
  ],
  'jeju': [
    [ 'jeju', 'gangwon', 'chungcheong' ],
    [ 'jeju', 'gangwon', 'gyeonggi' ],
    [ 'jeju', 'gangwon', 'gyeongsang' ],
    [ 'jeju', 'gangwon', 'jeolla' ],
    [ 'jeju', 'chungcheong', 'gyeonggi' ],
    [ 'jeju', 'chungcheong', 'gyeongsang' ],
    [ 'jeju', 'chungcheong', 'jeolla' ],
    [ 'jeju', 'gyeonggi', 'gyeongsang' ],
    [ 'jeju', 'gyeonggi', 'jeolla' ],
    [ 'jeju', 'gyeongsang', 'jeolla' ]
  ],
  'jeolla': [
    [ 'jeolla', 'gangwon', 'chungcheong' ],
    [ 'jeolla', 'gangwon', 'gyeonggi' ],
    [ 'jeolla', 'gangwon', 'gyeongsang' ],
    [ 'jeolla', 'gangwon', 'jeju' ],
    [ 'jeolla', 'chungcheong', 'gyeonggi' ],
    [ 'jeolla', 'chungcheong', 'gyeongsang' ],
    [ 'jeolla', 'chungcheong', 'jeju' ],
    [ 'jeolla', 'gyeonggi', 'gyeongsang' ],
    [ 'jeolla', 'gyeonggi', 'jeju' ],
    [ 'jeolla', 'gyeongsang', 'jeju' ]
  ]
}


export { korToEng, engToKor, dialectsFeature, shareText, locationComb }