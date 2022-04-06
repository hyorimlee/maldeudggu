import { withRouter } from 'next/router'
import { useState, useEffect } from 'react'

import Text from '../../../components/text/text'
import Button from '../../../components/button/button'
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
      { params: { shareId: '0' } }
    ],
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  if (params.shareId === '0') {
    return { props: { caseId: '0', nickname: 'empty', imageUrl: '', result: { 경기: 0, 경기: 0, 경기: 0 } } }
  }

  const image = await getRequest(`/${params.shareId}/my`)
  const result = await getRequest(`/${params.shareId}/result`)

  if (image.status === 500 || result.status === 500) {
    return { props: { notFoundCode: '0002' }}
  }

  return {
    props: {
      caseId: params.shareId,
      nickname: image.nickname,
      imageUrl: image.image_url,
      result: result.result,
    }
  }
}

function Share({ staticState, changeStaticState, caseId, nickname, imageUrl, result, router, notFoundCode }) {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_API_KEY)
    }
  }, [])

  useEffect(() => {
    if (notFoundCode === '0002') {
      router.replace({ pathname: '/404', query: { code: notFoundCode } })
    }
  }, [notFoundCode])

  if (notFoundCode === '0002') {
    return <></>
  }

  //페이지 없는 경우 띄우는 컴포넌트
  if (router.isFallback) {
    return <ThreeDotsWave contents={'결과를 찾아오고 있어요.'}></ThreeDotsWave>
  }

  const korLocation = Object.keys(result)


  // 공유하기 아이콘 클릭시 실행
  const clickedShare = (event) => {
    const id = event.target.id

    if (id === 'kakao') {
      window.Kakao.Link.sendCustom({
        templateId: 73945,
        templateArgs: { imageUrl, caseId }
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
    <div className={styles.container}>
      <div>
        <Text
          bold
          inline
          size={18}
          color={'orange'}
          contents={`${nickname}`}
        ></Text>
        <Text
          bold
          inline
          size={18}
          contents={`님의 말듣꾸`}
        ></Text>
      </div>
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
          ${nickname} 님의 억양은 ${korLocation[0]}도 방언과의 유사도가 ${result[korLocation[0]]}%로 가장 높아요.
          다음으로 ${korLocation[1]}도 ${result[korLocation[1]]}%, ${korLocation[2]}도 ${result[korLocation[2]]}% 순의 결과가 나왔습니다.
        `}>
      </Text>
      <Text contents={dialectsFeature[korLocation[0]]}></Text>
      <Button content={'테스트 다시하기'} handler={() => router.push('/')}></Button>
      <Text size={12} contents={'친구에게 공유하기'}></Text>
      <SNSContainer onClick={clickedShare}></SNSContainer>
    </div>
  )
}

export default withRouter(Share)