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
    recordAudio: [],
    recordAudioFile: [],
    myNickname: 'Test_Nicckname',
    myResult: {
      'case_id': 5669,
      'result': {
        '충청': 41,
        '강원': 35,
        '제주': 14
      }
    },
    myCharacter: {},
    sampleSentence: {
      "case_id": 5684,
      "sentences": [
          {
              "id": 3,
              "sentence": "밤에 모기가 날아다녀서 잠을 한숨도 못 잤어."
          },
          {
              "id": 1,
              "sentence": "오늘 무슨 반찬 먹었니?"
          },
          {
              "id": 7,
              "sentence": "되는 일이 없네, 짜증난다."
          },
          {
              "id": 6,
              "sentence": "선생님, 이거 어떻게 하는 거예요?"
          },
          {
              "id": 10,
              "sentence": "얼른 주말이 왔으면 좋겠다."
          }
      ]
    },
  })

  // 추가 구현 필요
  const changeStaticState = (type, data, event) => {
    function changeState() {
      const preState = {
        ...staticState
      }

      let recordAudio
      let recordAudioFile

      if (type === 'audioData') {
        recordAudio = [...staticState.recordAudio, data[0]]
        recordAudioFile = [...staticState.recordAudioFile, data[1]]
        setStaticState({
          ...preState, recordAudio, recordAudioFile
        })

      }

      if (type === 'sentence') {
        setStaticState({...preState, sampleSentence: data})
      }

      if (type === 'result') {
        setStaticState({...preState, myResult: data})
      }

    }
    changeState()
  }

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
