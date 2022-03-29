import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/layout/layout'

import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const [staticState, setStaticState] = useState({
    settings: {
      nightMode: false,
    },
    recordAudio: [],
    myResult: {},
    myCharacter: {},
  })

  // 추가 구현 필요
  const changeStaticState = (data) => (event) => {
    const preState = {
      ...staticState,
      ...staticState.settings,
      ...staticState.recordAudio,
      ...staticState.myResult,
      ...staticState.myCharacter,
    }

    setStaticState({
      ...preState
    })
  }

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
