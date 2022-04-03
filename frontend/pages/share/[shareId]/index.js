import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Text from '../../../components/text/text'
import SNSContainer from '../../../containers/sns/snsContainer'
import Image from '../../../components/image/image'
import ResultProgress from '../../../containers/progress/resultProgress'

import { shareText } from '../../../modules/locationText'
import { getRequest } from '../../../modules/fetch'
import { engToKor } from '../../../modules/locationText'

import styles from '../../../styles/share.module.css'

const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY
const INDEX_URL = process.env.NEXT_PUBLIC_INDEX_URL

function Share({ staticState, changeStaticState }) {
  const [info, setInfo] = useState({})
  const [results, setResults] = useState([])
  const router = useRouter()
  const { shareId, result } = router.query

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_API_KEY)
    }
  }, [])

  useEffect(() => {
    if (Object.keys(router.query).length) {
      setResults(router.query.result.split('_'))
      getRequest(`/${shareId}/my`)
      .then(response => {
        setInfo(response)
      })
    }
  }, [router])

  // 공유하기 아이콘 클릭시 실행
  const clickedShare = (event) => {
    const id = event.target.id
    if (id === 'kakao') {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '말듣꾸',
          description: shareText,
          imageUrl: `${info.image_url}`,
          link: {
            mobileWebUrl: 'http://j6a203.p.ssafy.io:3000/',
            androidExecParams: "test",
          },
        },
        buttons: [
          {
            title: '결과 확인',
            link: {
              mobileWebUrl: `http://j6a203.p.ssafy.io:3000/${router.asPath}`,
            },
          },
          {
            title: '테스트 하기',
            link: {
              mobileWebUrl: 'http://j6a203.p.ssafy.io:3000/',
            },
          }
        ]
      })
    } else if (id === 'twitter') {
      window.open("https://twitter.com/intent/tweet?text=" + shareText + "&url=" + INDEX_URL + router.asPath)
    } else if (id === 'facebook') {
      window.open("http://www.facebook.com/sharer/sharer.php?u=" + "'" + INDEX_URL + router.asPath + "'")
    } else if (id === 'link') {
      navigator.clipboard.writeText(INDEX_URL + router.asPath)
      // alert('복사되었습니다.')
    } else if (id === 'download') {
      // 다운로드 로직 필요
    }
  }

  return (
    <>
      {
        results.length
        ?
        (
          <>
            <Image type="myCharacter" path={info.image_url}></Image>
            <ResultProgress
              result={[
                [engToKor[results[0]], parseInt(results[1])],
                [engToKor[results[2]], parseInt(results[3])],
                [engToKor[results[4]], parseInt(results[5])]
              ]}
            ></ResultProgress>
            <Text size={12} contents={'친구에게 공유하기'}></Text>
            <SNSContainer onClick={clickedShare}></SNSContainer>
          </>
        )
        : <></>
      }
    </>
  )
}

export default Share