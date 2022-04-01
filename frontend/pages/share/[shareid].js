import Script from 'next/script'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Text from '../../components/text/text'
import SNSContainer from '../../containers/sns/snsContainer'
import Image from '../../components/image/image'

import styles from '../../styles/share.module.css'

const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY
const INDEX_URL = process.env.NEXT_PUBLIC_INDEX_URL
const SHARE_TEXT = `
당신의 말소리 방언을 찾아보세요! 
평소 말투를 분석하여 어느 지방의 방언을 사용하는지 알려주는 서비스입니다!
`

function Share({ staticState, changeStaticState }) {
  const router = useRouter()

  const { shareid, first, second, third } = router.query
    
  // 공유하기 아이콘 클릭시 실행
  const clickedShare = (event) => {
    const id = event.target.id
    window.Kakao.init(KAKAO_API_KEY)
    console.log(window.Kakao.isInitialized())

    if (id === 'kakao') {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '오늘의 디저트',
          description: '아메리카노, 빵, 케익',
          imageUrl:
            'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
          link: {
            mobileWebUrl: 'http://j6a203.p.ssafy.io:3000/',
            androidExecParams: "test",
          },
        },
        buttons: [
          {
            title: '웹으로 이동',
            link: {
              mobileWebUrl: 'http://j6a203.p.ssafy.io:3000/',
            },
          }
        ]
      })

      // window.Kakao.Link.sendCustom({
      //   templateId: 73945,
      //   templateArgs: {
      //     'THU': 'https://w.namu.la/s/9071d0575b6d14c0d6fc5832e26fe8ef0a298a1abb1d442cc3c865534ec5e949e8a2d195fe425ebb15f2f1f5b270e6b86979bd1e3fcb4e9d9432bdfbf4fb02a60e245973d362fe31a044c09a5e7ecedcf593e7612e89cf721a17560806d89288',
      //   }
      // })
    } else if (id === 'twitter') {
      window.open("https://twitter.com/intent/tweet?text=" + SHARE_TEXT + "&url=" + INDEX_URL);
    } else if (id === 'facebook') {
      window.open("http://www.facebook.com/sharer/sharer.php?u=" + INDEX_URL);
    } else if (id === 'link') {
      navigator.clipboard.writeText(INDEX_URL)
      alert('복사되었습니다.')
    } else if (id === 'download') {
      const a = document.createElement('a')
      a.href = staticState.myCharacter.path
      a.download = `말듣꾸_${staticState.myCharacter.id}.png`
      a.click()
    }
  }

  return (
    <>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy='afterInteractive'></Script>
      <Image type="myCharacter" path={staticState.myCharacter.path}></Image>
      <Text size={12} contents={'친구에게 공유하기'}></Text>
      <SNSContainer onClick={clickedShare}></SNSContainer>
    </>
  )
}

export default Share