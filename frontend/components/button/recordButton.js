import { useState, useEffect, useRef } from 'react';
import { motion, resolveMotionValue } from "framer-motion"

import Text from '../text/text'

import styles from './recordButton.module.css';

// 파일 이름 형식을 맞추기 위해 날짜를 리턴하는 함수
function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

function RecordButton({ sentenceId, staticState, changeStaticState }) {
  const [animateOptions, setAnimateOptions] = useState({ pathLength: 0, transitionTime: 0, buttonColor: '#ccc' })
  const [timer, setTimer] = useState(null)
  const [audio, setAudio] = useState({ rerecord: false })

  useEffect(() => {
    if (audio.audioUrl) {
      const today = getDate()
      const sound = new File([audio.audioUrl], `${today}-${sentenceId}.${staticState.settings.browser.audioType}`, { lastModified: new Date().getTime(), type: `audio/${staticState.settings.browser.audioType}` })

      const url = URL.createObjectURL(audio.audioUrl)
      changeStaticState('audioData', [url, sound]);
    }
  }, [audio.audioUrl])

  // 컴포넌트에 onClick 으로 연결되는 함수, onRec에 따라 녹음을 시작/종료
  function changeRecordState() {
    // 애니메이션 실행위함
    if (animateOptions.buttonColor === '#ccc') {
      setAnimateOptions({ pathLength: 1.1, transitionTime: 10, buttonColor: '#FF214D' })
      startRecord()
    } else {
      setAnimateOptions({ pathLength: 0, transitionTime: 0, buttonColor: '#ccc' })
      stopRecord(audio)
    }
  }

  // 녹음을 실행하는 함수
  async function startRecord() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createScriptProcessor(0, 1, 1);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, { mimeType: `audio/${staticState.settings.browser.audioType}` })

      mediaRecorder.start();
      const source = audioCtx.createMediaStreamSource(stream);

      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      setTimer(setTimeout(() => stopRecord({ mediaRecorder, analyser, source, stream }), 9900))

      setAudio({ ...audio, stream, mediaRecorder, source, analyser })
    } catch (error) {
      alert('녹음에 문제가 있어요.')
      console.error(error)
    }
  }

  function stopRecord({ mediaRecorder, analyser, source, stream }) {
    clearTimeout(timer)

    mediaRecorder.stop()
    analyser.disconnect();
    source.disconnect();

    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    mediaRecorder.ondataavailable = event => {
      const audioEl = document.createElement('audio')
      if (/iPhone/.test(navigator.userAgent)) {
        audioEl.autoplay = true
      }
      audioEl.src = URL.createObjectURL(event.data)

      audioEl.onloadeddata = () => {
        if (audioEl.duration === Infinity) {
          audioEl.currentTime = Number.MAX_SAFE_INTEGER
          audioEl.ontimeupdate = () => {
            audioEl.ontimeupdate = null
            audioEl.duration >= 1.2 ? setAudio({ ...audio, audioUrl: event.data, duration: audioEl.duration }) : setAudio({ ...audio, rerecord: true })
            audioEl.currentTime = 0
          }
        } else {
          audioEl.duration >= 1.2 ? setAudio({ ...audio, audioUrl: event.data, duration: audioEl.duration }) : setAudio({ ...audio, rerecord: true })
        }
      }
    }
  }

  return (
    <>
      {audio.rerecord ? <Text contents='음성이 너무 짧아요. 다시 녹음해주세요!' size={16} ></Text> : <></>}
      <div className={styles.container}>
        <svg className={styles.progressIcon} onClick={changeRecordState} viewBox="0 0 50 50">
          <motion.path
            fill="none"
            strokeWidth="5"
            stroke="#ccc"
            strokeDasharray="0 1"
            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
            strokeLinecap="butt"
            style={{
              translateX: 5,
              translateY: 5,
            }}
            initial={{ pathLength: 1.1 }}
          />
          <motion.path
            fill="none"
            strokeWidth="5"
            stroke="#FF214D"
            strokeDasharray="0 1"
            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
            strokeLinecap="butt"
            style={{
              rotate: 90,
              translateX: 5,
              translateY: 5,
              scaleX: -1
            }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: animateOptions.pathLength }}
            transition={{ duration: animateOptions.transitionTime, ease: 'linear' }}
          />
          <motion.path
            fill={`${animateOptions.buttonColor}`}
            d="M 0, 10 a 10, 10 0 1,0 20,0 a 10, 10 0 1,0 -20,0"
            style={{
              translateX: 15,
              translateY: 15,
            }}
            initial={{ pathLength: 1.1 }}
          />
        </svg>
      </div>
    </>
  )
}

export default RecordButton;
