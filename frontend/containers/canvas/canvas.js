import { useState } from 'react'

import styles from './canvas.module.css'

function Canvas({  }) {
  const [coordinatesDiff, setCoordinatesDiff] = useState({})

  const touched = (event) => {
    // 터치한 부분과 div의 x,y 좌표 간격 차이
    const difX = event.targetTouches[0].clientX - event.target.offsetLeft
    const difY = event.targetTouches[0].clientY - event.target.offsetTop
    
    setCoordinatesDiff({x: difX, y: difY})
  }
  
  const moveItem = (event) => {
    const x = event.targetTouches[0].clientX - coordinatesDiff.x
    const y = event.targetTouches[0].clientY - coordinatesDiff.y

    event.target.style.left = x + 'px'
    event.target.style.top = y + 'px'
  }

  const touchEnd = (event) => {
    const canvasBottom = event.target.parentElement.offsetTop + event.target.parentElement.offsetHeight
    const canvasRight = event.target.parentElement.offsetLeft + event.target.parentElement.offsetWidth
    
    const itemTop = event.target.offsetTop
    const itemBottom = event.target.offsetTop + event.target.offsetHeight
    const itemLeft = event.target.offsetLeft
    const itemRight = event.target.offsetLeft + event.target.offsetWidth

    const halfHeight = parseInt(event.target.offsetHeight/2)
    const halfWidth = parseInt(event.target.offsetWidth/2)

    if (itemTop < -halfHeight || itemBottom > canvasBottom || itemLeft < -halfWidth || itemRight > canvasRight) {
      alert('캐릭터를 너무 바깥에 두지 말아주세요 ㅠ')
      if (itemTop < -halfHeight) {
        event.target.style.top = -halfHeight + 'px'
      }
      if (itemBottom > canvasBottom) {
        event.target.style.top = (canvasBottom - event.target.offsetHeight) + 'px'
      }
      if (itemLeft < -halfWidth) {
        event.target.style.left = -halfWidth + 'px'
      }
      if (itemRight > canvasRight) {
        event.target.style.left = (canvasRight - event.target.offsetWidth) + 'px'
      }
    }

  }

  return (
    <div className={styles.container}>
        <div className={styles.item1} onTouchStart={touched} onTouchMove={moveItem} onTouchEnd={touchEnd}></div>
        <div className={styles.item2} onTouchStart={touched} onTouchMove={moveItem} onTouchEnd={touchEnd}></div>
    </div>
  )
}

export default Canvas