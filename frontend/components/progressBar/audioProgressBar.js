import React, { useState, useRef, useEffect } from 'react'
import styles from './audioProgressBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons"

const AudioProgressBar = ( { staticState }) => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef();   // reference our audio component
  const progressBar = useRef();   // reference our progress bar
  const animationRef = useRef();  // reference the animation

  let recordAudio = staticState.recordAudio
  console.log(recordAudio)
  let audio = recordAudio[recordAudio.length - 1]

  // let audioUrl = recordAudio[recordAudio.length - 1]
  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  return (
    <div className={styles.audioPlayer}>
      <audio ref={audioPlayer} src={audio} type="audio/mpeg" preload="metadata"></audio>
      <button onClick={togglePlayPause} className={styles.playPause}>
        {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} className={styles.play} />}
      </button>
      {/* progress bar */}
      <div>
        <input type="range" className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={changeRange} />
      </div>
    </div>
  )
}

export default AudioProgressBar;