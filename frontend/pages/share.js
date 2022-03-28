import Script from 'next/script'
import { useEffect } from 'react'
import Text from '../components/text/text'
import SNSContainer from '../containers/sns/snsContainer'

import styles from '../styles/share.module.css'

const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY

function Share({ staticState, changeStaticState }) {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_API_KEY)
    }
  }, [])

  const clickedShare = (event) => {
    const id = event.target.id

    if (id === 'kakao') {
      window.Kakao.Link.sendCustom({
        templateId: 73945,
        templateArgs: {
          'THU': 'https://w.namu.la/s/9071d0575b6d14c0d6fc5832e26fe8ef0a298a1abb1d442cc3c865534ec5e949e8a2d195fe425ebb15f2f1f5b270e6b86979bd1e3fcb4e9d9432bdfbf4fb02a60e245973d362fe31a044c09a5e7ecedcf593e7612e89cf721a17560806d89288',
        }
      })
    }
  }

  return (
    <>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy='beforeInteractive'></Script>
      <Text size={12} contents={'친구에게 공유하기'}></Text>
      <SNSContainer onClick={clickedShare}></SNSContainer>
    </>
  )
}

export default Share