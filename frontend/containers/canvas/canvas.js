import { useState, useEffect, useRef } from 'react'
import Image from '../../components/image/image'

import styles from './canvas.module.css'

function Canvas({ color, items, background, firstLocation, staticState }) {
  const [coordinatesDiff, setCoordinatesDiff] = useState({})
  const character = useRef()
  const container = useRef()
  const item1 = useRef()
  const item2 = useRef()
  const item3 = useRef()

  // 최초 캐릭터 터치시에 터치된 부분과 캐릭터 div의 위치와 차이값 계산
  const touched = (event) => {
    const difX = event.targetTouches[0].clientX - event.target.offsetLeft
    const difY = event.targetTouches[0].clientY - event.target.offsetTop

    setCoordinatesDiff({ x: difX, y: difY })
  }

  // 캐릭터 터치로 드래그하여 이동
  const moveItem = (event) => {
    const x = event.targetTouches[0].clientX - coordinatesDiff.x
    const y = event.targetTouches[0].clientY - coordinatesDiff.y

    if (event.target.id === 'character') {
      character.current.style.left = x + 'px'
      character.current.style.top = y + 'px'
    } else if (event.target.id === 'item1') {
      item1.current.style.left = x + 'px'
      item1.current.style.top = y + 'px'
    } else if (event.target.id === 'item2') {
      item2.current.style.left = x + 'px'
      item2.current.style.top = y + 'px'
    } else if (event.target.id === 'item3') {
      item3.current.style.left = x + 'px'
      item3.current.style.top = y + 'px'
    }
  }

  // 캐릭터 터치 손에서 놓으면 실행됨
  const touchEnd = (event) => {
    const canvasBottom = event.target.parentElement.offsetTop + event.target.parentElement.offsetHeight
    const canvasRight = event.target.parentElement.offsetLeft + event.target.parentElement.offsetWidth

    const itemTop = event.target.offsetTop
    const itemBottom = event.target.offsetTop + event.target.offsetHeight
    const itemLeft = event.target.offsetLeft
    const itemRight = event.target.offsetLeft + event.target.offsetWidth

    const halfHeight = parseInt(event.target.offsetHeight / 2)
    const halfWidth = parseInt(event.target.offsetWidth / 2)

    if (itemTop < -halfHeight || itemBottom > canvasBottom || itemLeft < -halfWidth || itemRight > canvasRight) {
      alert('캐릭터를 너무 바깥에 두지 말아주세요 ㅠ')
      if (itemTop < -halfHeight) {
        event.target.style.top = -parseInt(event.target.offsetHeight / 3) + 'px'
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

  const dragStart = event => {
    setCoordinatesDiff({ x: event.clientX, y: event.clientY })
  }

  const drag = event => {
    event.target.style.left = `${event.target.offsetLeft + event.clientX - coordinatesDiff.x}px`
    event.target.style.top = `${event.target.offsetTop + event.clientY - coordinatesDiff.y}px`

    setCoordinatesDiff({x: event.clientX, y: event.clientY})
  }

  const dragEnd = event => {
    // 왼쪽 위
    if (event.target.offsetTop + event.clientY < -parseInt(event.target.offsetHeight/2) && event.target.offsetLeft + event.clientX < -parseInt(event.target.offsetWidth/2)) {
      event.target.style.top = `${-parseInt(event.target.offsetHeight/3)}px`
      event.target.style.left = `${-parseInt(event.target.offsetHeight/3)}px`
      alert('캐릭터를 너무 바깥에 두지 말아주세요 ㅠ')

    // 오른쪽 위
    } else if (event.target.offsetTop + event.clientY < -parseInt(event.target.offsetHeight/2) && event.target.parentElement.offsetWidth - parseInt(event.target.offsetWidth/2) < event.target.offsetLeft + event.clientX) {
      event.target.style.top = `${-parseInt(event.target.offsetHeight/3)}px`
      event.target.style.left = `${event.target.parentElement.offsetWidth - parseInt(event.target.offsetWidth/1.5)}px`
      alert('캐릭터를 너무 바깥에 두지 말아주세요 ㅠ')

    // 왼쪽 아래
    } else if (event.target.offsetLeft + event.clientX < -parseInt(event.target.offsetWidth/2) && event.target.parentElement.offsetHeight - parseInt(event.target.offsetHeight/2) < event.target.offsetTop + event.clientY) {
      event.target.style.top = `${event.target.parentElement.offsetHeight - parseInt(event.target.offsetHeight/1.5)}px`
      event.target.style.left = `${-parseInt(event.target.offsetHeight/3)}px`
      alert('캐릭터를 너무 바깥에 두지 말아주세요 ㅠ')

    // 오른쪽 아래
    } else if (event.target.parentElement.offsetHeight - parseInt(event.target.offsetHeight/2) < event.target.offsetTop + event.clientY && event.target.parentElement.offsetWidth - parseInt(event.target.offsetWidth/2) < event.target.offsetLeft + event.clientX) {
      event.target.style.top = `${event.target.parentElement.offsetHeight - parseInt(event.target.offsetHeight/1.5)}px`
      event.target.style.left = `${event.target.parentElement.offsetWidth - parseInt(event.target.offsetWidth/1.5)}px`
      alert('캐릭터를 너무 바깥에 두지 말아주세요 ㅠ')
    
    // 위
    } else if (event.target.offsetTop + event.clientY < -parseInt(event.target.offsetHeight/2)) {
      event.target.style.top = `${-parseInt(event.target.offsetHeight/2)}px`
      event.target.style.left = `${event.target.offsetLeft + event.clientX - coordinatesDiff.x}px`
      alert('캐릭터를 너무 바깥에 두지 말아주세요 ㅠ')

    // 왼쪽
    } else if (event.target.offsetLeft + event.clientX < -parseInt(event.target.offsetWidth/2)) {
      event.target.style.top = `${event.target.offsetTop + event.clientY - coordinatesDiff.y}px`
      event.target.style.left = `${-parseInt(event.target.offsetHeight/2)}px`
      alert('캐릭터를 너무 바깥에 두지 말아주세요 ㅠ')

    // 아래
    } else if (event.target.parentElement.offsetHeight - parseInt(event.target.offsetHeight/2) < event.target.offsetTop + event.clientY) {
      event.target.style.top = `${event.target.parentElement.offsetHeight - parseInt(event.target.offsetHeight/2)}px`
      event.target.style.left = `${event.target.offsetLeft + event.clientX - coordinatesDiff.x}px`
      alert('캐릭터를 너무 바깥에 두지 말아주세요 ㅠ')

    // 오른쪽
    } else if (event.target.parentElement.offsetWidth - parseInt(event.target.offsetWidth/2) < event.target.offsetLeft + event.clientX) {
      event.target.style.top = `${event.target.offsetTop + event.clientY - coordinatesDiff.y}px`
      event.target.style.left = `${event.target.parentElement.offsetWidth - parseInt(event.target.offsetWidth/2)}px`
      alert('캐릭터를 너무 바깥에 두지 말아주세요 ㅠ')

    // 정상
    } else {
      event.target.style.top = `${event.target.offsetTop + event.clientY - coordinatesDiff.y}px`
      event.target.style.left = `${event.target.offsetLeft + event.clientX - coordinatesDiff.x}px`
    }
  }

  // 색상 변경시에만 실행됨
  useEffect(() => {
    if (color) {
      const preTop = character.current.style.top
      const preLeft = character.current.style.left

      character.current.src = `/img/character/${firstLocation}/${color}`
      character.current.style = `top: ${preTop ? preTop : 0}; left:${preLeft ? preLeft : 0};`
      character.current.className = styles.character
    } else {
      // character.current.src = `/img/character/${firstLocation}/${firstLocation}-1.svg`
      character.current.className = styles.character
    }
  }, [color])

  // 아이템 변경 있을 경우에만 실행됨
  useEffect(() => {
    const refList = [item1, item2, item3]
    const nums = [0, 1, 2]
    const ids = items.map(item => item.id)

    let chk = 0
    nums.forEach((num) => {
      let e
      if (ids.includes(num) === true) {
        e = refList[items[chk].id]
        const preTop = e.current.style.top
        const preLeft = e.current.style.left

        e.current.className = styles.item
        e.current.src = `/img/items/${items[chk].location}/${items[chk].item}`
        e.current.style = `top: ${preTop ? preTop : 0}; left: ${preLeft ? preLeft : 0};`
        chk += 1
      } else {
        e = refList[num]
        e.current.style = `top: 0px; left: 0px;`
        e.current.className = styles.none
      }
    })
  }, [items])

  return (
    <div id='canvas' className={`${styles.container} ${staticState.settings.nightMode ? styles.nightMode : ''}`} ref={container}>
      {
        background
        ?
          <div className='background'>
            <Image type={'background'} path={`/img/background/${background}`}></Image>
          </div>
        :
          <></>
      }
      <img
        id='character'
        ref={character}
        className={styles.none}
        onDragStart={dragStart}
        onDrag={drag}
        onDragEnd={dragEnd}
        onTouchStart={touched}
        onTouchMove={moveItem}
        onTouchEnd={touchEnd}
      ></img>
      <img
        id='item1'
        ref={item1}
        className={styles.none}
        onDragStart={dragStart}
        onDrag={drag}
        onDragEnd={dragEnd}
        onTouchStart={touched}
        onTouchMove={moveItem}
        onTouchEnd={touchEnd}
      ></img>
      <img
        id='item2'
        ref={item2}
        className={styles.none}
        onDragStart={dragStart}
        onDrag={drag}
        onDragEnd={dragEnd}
        onTouchStart={touched}
        onTouchMove={moveItem}
        onTouchEnd={touchEnd}
      ></img>
      <img
        id='item3'
        ref={item3}
        className={styles.none}
        onDragStart={dragStart}
        onDrag={drag}
        onDragEnd={dragEnd}
        onTouchStart={touched}
        onTouchMove={moveItem}
        onTouchEnd={touchEnd}
      ></img>
    </div>
  )
}

export default Canvas