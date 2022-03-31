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

      if (data) {
        recordAudio = [...staticState.recordAudio, data]
      }
      setStaticState({
        ...preState, recordAudio
      })

      if (type === 'sentence') {
        setStaticState({...preState, sampleSentence: data})
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
