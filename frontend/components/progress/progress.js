import { useEffect, useRef } from 'react'

import styles from './progress.module.css'

function Progress({ percent=0 }) {
  const gauge = useRef()
  
  useEffect(() => {
    console.log(percent)
    gauge.current.style = `width: ${percent}%;`
  }, [])

  return (
    <>
      <div className={styles.container}>
        <div ref={gauge} className={styles.gauge}></div>
      </div>
    </>
  )
}

export default Progress