import Head from 'next/head'
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
    myResult: [
      ['gangwon', '50'],
      ['chungcheong', '35'],
      ['gyeonggi', '15']
    ],
    myCharacter: {},
    sampleSentence: [],
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
        console.log(data)
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

  console.log(staticState)

  return (
    <Layout>
      <Head>
        <title>말듣꾸</title>
      </Head>
      <Component {...pageProps} staticState={staticState} changeStaticState={changeStaticState} />
    </Layout>
  )
}

export default MyApp
