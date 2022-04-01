import Script from 'next/script'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from '../../firebaseConfig'

import Text from '../../components/text/text'
import SNSContainer from '../../containers/sns/snsContainer'
import Image from '../../components/image/image'

import { getRequest } from '../../modules/fetch'
import styles from '../../styles/share.module.css'

const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY
const INDEX_URL = process.env.NEXT_PUBLIC_INDEX_URL
const SHARE_TEXT = `
당신의 말소리 방언을 찾아보세요! 
평소 말투를 분석하여 어느 지방의 방언을 사용하는지 알려주는 서비스입니다!
`

// firebase 초기화
const storage = getStorage(initializeApp(firebaseConfig));

function Share({ staticState, changeStaticState }) {
  const [info, setInfo] = useState({})  
  const router = useRouter()
  const { shareid, first, second, third } = router.query

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_API_KEY)
    }
  }, [])

  useEffect(() => {
    if (Object.keys(router.query).length) {
      getRequest(`/${shareid}/my`)
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
          description: SHARE_TEXT,
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
      window.open("https://twitter.com/intent/tweet?text=" + SHARE_TEXT + "&url=" + INDEX_URL + router.asPath);
    } else if (id === 'facebook') {
      window.open("http://www.facebook.com/sharer/sharer.php?u=" + INDEX_URL + router.asPath);
    } else if (id === 'link') {
      console.log(navigator.clipboard)
      navigator.clipboard.writeText(INDEX_URL + router.asPath)
      // alert('복사되었습니다.')
    } else if (id === 'download') {
      // const storageRef = ref(storage, `${shareid}.png`)

      // const xhr = new XMLHttpRequest();
      // xhr.responseType = 'blob';
      // xhr.onload = (event) => {
      //   const blob = xhr.response;
      // };
      // xhr.open('GET', info.image_url);
      // xhr.send();

      // const img = document.createElement('img')
      // img.src = info.image_url
      // img.download = `/말듣꾸_${shareid}.png`
      // img.click()
    }
  }

  return (
    <>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy='beforeInteractive'></Script>
      <Image type="myCharacter" path={info.image_url}></Image>
      <Text size={12} contents={'친구에게 공유하기'}></Text>
      <SNSContainer onClick={clickedShare}></SNSContainer>
    </>
  )
}

export default Share