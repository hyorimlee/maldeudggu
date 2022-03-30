import styles from './recordButton.module.css';
import { useState, useEffect, useCallback } from 'react';
import { motion } from "framer-motion"

function RecordButton( { staticState, changeStaticState } ) {
  // 애니메이션 관련 state
  const [toggle, setToggle] = useState(false);
  const [pathLength, setPathLength] = useState(0);
  const [transitionTime, setTransitionTime] = useState(0);
  const [buttonColor, setButtonColor] = useState('#ccc');
  // 녹음기능 관련 state
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(false);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  // 녹음 완료 여부(임시)
  const [isComplete, setIsComplete] = useState(false);

  // toggle 값이 변경될 때마다 트랜지션 옵션(시간, 길이, 색)을 바꿔주기 위한 내용
  useEffect(() => {
    if (toggle) {
      setPathLength(1.1);
      setTransitionTime(10);
      setButtonColor('#FF214D')
    } else {
      setPathLength(0);
      setTransitionTime(0);
      setButtonColor('#ccc')
    };
  }, [toggle]);

  useEffect(() => {
    console.log(audioUrl);
    if (audioUrl) {
      const sound = new File([audioUrl], `soundfile${dd}`, { lastModified: new Date().getTime(), type: "audio/webm" });
      console.log(sound)
      const url = URL.createObjectURL(audioUrl)
      console.log(url)
      changeStaticState(url);
    }
    console.log(audioUrl)
  }, [audioUrl])

  // 컴포넌트에 onClick 으로 연결되는 함수, onRec에 따라 녹음을 시작/종료
  function changeRecordState() {
    setToggle(!toggle);
    if (!onRec) {
      startRecord();
    } else {
      stopRecord()
    }
  }

  // 녹음을 실행하는 함수
  function startRecord() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);

    setAnalyser(analyser);

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);

      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      console.log(media);

      analyser.onaudioprocess = function (e) {
        // 10초 이후 정지
        if (e.playbackTime > 10) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          setToggle(!toggle);

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(false);
          };
        } else {
          setOnRec(true);
        }
      };
      setOnRec(true);
    });
  }

  function stopRecord() {
    media.ondataavailable = function (e) {
      console.log(e);
      setAudioUrl(() => e.data);
      setOnRec(false);
      // console.log(audioUrl);
      // const sound = new File([audioUrl], "soundBlob", { lastModified: new Date().getTime(), type: "audio" });
      // console.log(sound);
    };

    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    media.stop();
    analyser.disconnect();
    source.disconnect();
  }

  // AudioUrl이 변경되면 URL을 console에 찍고, 음성파일로 변환
  // const onSubmitAudioFile = useCallback(() => {
  //   const sound = new File([audioUrl], "soundBlob", { lastModified: new Date().getTime(), type: "audio" });
  //   console.log(sound); // File 정보 출력

  //   if (audioUrl) {
  //     console.log(URL.createObjectURL(audioUrl));
  //   } else {
  //     console.log('No url')
  //   }
  //   console.log(`파일: ${sound}`)
  // }, [audioUrl]);

  // 음성파일을 실행하는 함수
  const play = () => {
    const audio = new Audio(URL.createObjectURL(audioUrl));
    console.log(audioUrl)
    audio.loop = false;
    audio.volume = 1;
    audio.play();
  };

  console.log(staticState)

  return (
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
          animate={{ pathLength: pathLength }}
          transition={{ duration: transitionTime, ease: 'linear' }}
          />
        <motion.path
          fill={`${buttonColor}`}
          d="M 0, 10 a 10, 10 0 1,0 20,0 a 10, 10 0 1,0 -20,0"
          style={{
            translateX: 15,
            translateY: 15,
          }}
          initial={{ pathLength: 1.1 }}
        />
      </svg>
    </div>
  )
}

export default RecordButton;