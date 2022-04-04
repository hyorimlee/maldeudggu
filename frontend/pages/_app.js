import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../components/layout/layout'

import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [staticState, setStaticState] = useState({
    settings: {
      nightMode: false,
    },
    caseId: -1,
    nickname: '',
    sentences: [],
    recordCount: 0,
    recordAudio: [],
    recordAudioFile: [],
    result: {},
    reuse: false
  })

  const changeStaticState = (type, data, type2, data2, event) => {
    function changeState() {
      if (type === 'audioData') {
        let recordAudio
        let recordAudioFile

        if (staticState.recordAudio.length === staticState.recordCount + 1) {
          if (data === null) {
            recordAudio = [...staticState.recordAudio.slice(0, -1)]
            recordAudioFile = [...staticState.recordAudioFile.slice(0, -1)]
          } else {
            recordAudio = [...staticState.recordAudio.slice(0, -1), data[0]]
            recordAudioFile = [...staticState.recordAudioFile.slice(0, -1), data[1]]
          }
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

  // 새로고침시 확인 메시지 띄우기, 녹음 페이지 이동 못하게 막기
  useEffect(() => {
    const reloadHandler = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
     
    const before = () => {
      if (router.pathname.split('/')[1] === 'record' || router.pathname === '/') {
        alert('이전 또는 이후 화면으로 돌아갈 수 없습니다.')
        return false
      }
      return true
    }
    
    window.addEventListener('beforeunload', reloadHandler)
    router.beforePopState(before)
  }, [])

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
