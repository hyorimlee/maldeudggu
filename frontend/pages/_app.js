import Head from 'next/head'
import Script from 'next/script'
import { useState } from 'react'
import Layout from '../components/layout/layout'

import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'

import { postRequest } from '../modules/fetch'

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const [staticState, setStaticState] = useState({
    settings: {
      nightMode: false,
    },
    caseId: 0,
    nickname: '',
    sentences: [],
    recordCount: 0,
    recordAudio: [],
    recordAudioFile: [],
    result: {
      '충청': 41,
      '강원': 35,
      '제주': 14
    },
    myCharacter: {},
    reuse: false
  })

  // 추가 구현 필요
  const changeStaticState = (type, data, type2, data2, event) => {
    function changeState() {
      if (type === 'audioData') {
        let recordAudio
        let recordAudioFile
        
        if (staticState.recordAudio.length === staticState.recordCount + 1) {
          recordAudio = [...staticState.recordAudio.slice(0, -1), data[0]]
          recordAudioFile = [...staticState.recordAudioFile.slice(0, -1), data[1]]
        } else {
          recordAudio = [...staticState.recordAudio, data[0]]
          recordAudioFile = [...staticState.recordAudioFile, data[1]]
        }

        setStaticState({
          ...staticState, recordAudio, recordAudioFile
        })
      } else {
        if (type2) {
          setStaticState({ ...staticState, [type]: data, [type2]: data2 })
        } else {
          setStaticState({ ...staticState, [type]: data })
        }
      }
    }
    changeState()
  }

  console.log(staticState)

  return (
    <Layout>
      <Head>
        <title>말듣꾸</title>
      </Head>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy='beforeInteractive'></Script>
      <Component {...pageProps} staticState={staticState} changeStaticState={changeStaticState} />
    </Layout>
  )
}

export default MyApp
