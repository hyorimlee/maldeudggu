import { withRouter } from 'next/router'
import { useState, useEffect } from 'react'

import Text from '../../../components/text/text'
import SNSContainer from '../../../containers/sns/snsContainer'
import Image from '../../../components/image/image'
import ResultProgress from '../../../containers/progress/resultProgress'
import ThreeDotsWave from '../../../components/loading/loading'

import { shareText } from '../../../modules/locationText'
import { getRequest } from '../../../modules/fetch'
import { engToKor, dialectsFeature } from '../../../modules/locationText'

import styles from '../../../styles/share.module.css'

const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY
const INDEX_URL = process.env.NEXT_PUBLIC_INDEX_URL

export async function getStaticPaths() {
  return {
    paths: [
      { params: { shareId: ''} }
    ],
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const image = await getRequest(`/${params.shareId}/my`)
  const result = await getRequest(`/${params.shareId}/result`)

  return {
    props: {
      caseId: params.shareId,
      nickname: image.nickname,
      imageUrl: image.image_url,
      result: result.result,
    }
  }
}

function Share({ staticState, changeStaticState, nickname, imageUrl, result, router, caseId }) {
  //페이지 없는 경우 띄우는 컴포넌트
  if (router.isFallback) {
    return <ThreeDotsWave contents={'이미지를 제작하는 중입니다'}></ThreeDotsWave>
  }

  const korLocation = Object.keys(result)

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_API_KEY)
    }
  }, [])

  // 공유하기 아이콘 클릭시 실행
  const clickedShare = (event) => {
    const id = event.target.id

    if (id === 'kakao') {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '말듣꾸',
          description: shareText,
          imageUrl: `${imageUrl}`,
          link: {
            webUrl: `https://j6a203.p.ssafy.io:3000/share/${caseId}`,
            mobileWebUrl: `https://j6a203.p.ssafy.io:3000/share/${caseId}`,
            androidExecutionParams: `https://j6a203.p.ssafy.io:3000/share/${caseId}`,
            iosExecutionParams: `https://j6a203.p.ssafy.io:3000/share/${caseId}`,
          },
        },
        buttons: [
          {
            title: '결과 보러가기',
            link: {
              webUrl: `https://j6a203.p.ssafy.io:3000/share/${caseId}`,
              mobileWebUrl: `https://j6a203.p.ssafy.io:3000/share/${caseId}`,
              androidExecutionParams: `https://j6a203.p.ssafy.io:3000/share/${caseId}`,
              iosExecutionParams: `https://j6a203.p.ssafy.io:3000/share/${caseId}`,
            },
          },
          {
            title: '나의 방언 보러가기',
            link: {
              webUrl: 'https://j6a203.p.ssafy.io:3000/',
              mobileWebUrl: 'https://j6a203.p.ssafy.io:3000/',
              androidExecutionParams: 'https://j6a203.p.ssafy.io:3000/',
              iosExecutionParams: 'https://j6a203.p.ssafy.io:3000/',
            },
          }
        ]
      })
    } else if (id === 'twitter') {
      window.open("https://twitter.com/intent/tweet?text=" + shareText + "&url=" + INDEX_URL + '/share/' + caseId)
    } else if (id === 'facebook') {
      window.open("http://www.facebook.com/sharer/sharer.php?u=" + INDEX_URL + '/share/' + caseId)
    } else if (id === 'link') {
      navigator.clipboard.writeText(INDEX_URL + '/share/' + caseId)
      .then(() => alert('복사되었습니다.'))
      .catch(error => alert('주소 복사에 실패했습니다.'))
    } else if (id === 'download') {
      getRequest(`/${caseId}/download`)
      .then(blob => {
        const downloadUrl = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = `말듣꾸-${caseId}.png`
        a.click()
      })
    }
  }

  return (
    <>
      <Image type="myCharacter" path={imageUrl}></Image>
      <ResultProgress
        result={[
          [korLocation[0], parseInt(result[korLocation[0]])],
          [korLocation[1], parseInt(result[korLocation[1]])],
          [korLocation[2], parseInt(result[korLocation[2]])],
        ]}
      ></ResultProgress>
      <Text
        contents={`
          ${nickname} 님의 목소리는 ${korLocation[0]} 방언이 ${result[korLocation[0]]}% 로 주로 사용하시는군요!
          그 외에 ${korLocation[1]} ${result[korLocation[1]]}%, ${korLocation[2]} ${result[korLocation[2]]}% 가 나왔습니다.
        `}>
      </Text>
      <Text contents={dialectsFeature[korLocation[0]]}></Text>
      <Text size={12} contents={'친구에게 공유하기'}></Text>
      <SNSContainer onClick={clickedShare}></SNSContainer>
    </>
  )
}

export default withRouter(Share)