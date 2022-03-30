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
    myResult: {},
    myCharacter: {},
    sampleSentence: [],
  })

  // 추가 구현 필요
  const changeStaticState = (data, event) => {
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
    }
    changeState()
  }

  postRequest('/start/', [["nickname", "choux"]])

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
