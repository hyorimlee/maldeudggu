import React, { useState, useRef, useEffect } from 'react'
import styles from './audioProgressBar.module.css'
import Image from '../image/image'

const AudioProgressBar = ({ staticState }) => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);

  // references
  const audioPlayer = useRef();   // reference our audio component

  let recordAudio = staticState.recordAudio
  let audio = recordAudio[recordAudio.length - 1]

  const resetAudio = () => {
    setIsPlaying(!isPlaying)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  }

  return (
    <div className={styles.audioPlayer}>
      <audio ref={audioPlayer} src={audio} type="audio" onEnded={resetAudio} preload="metadata"></audio>
      <button onClick={togglePlayPause} className={styles.playPause}>
        {isPlaying ? <Image type={'playPause'} path='/img/logo/pause.png'></Image> : <Image type={'playPause'} path='/img/logo/play.png'></Image>}
      </button>
    </div>
  )
}

export default AudioProgressBar;