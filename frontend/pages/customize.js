import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from '../firebaseConfig'

import { getBackgroundList, getFileList } from "../modules/filelist"
import { patchRequest, getRequest } from '../modules/fetch'
import { korToEng } from '../modules/locationText'

import Canvas from '../containers/canvas/canvas'
import ItemSelector from "../containers/itemSelector/itemSelector"
import Button from '../components/button/button'


// firebase 초기화
const storage = getStorage(initializeApp(firebaseConfig));

// 특정 폴더에서 이미지 이름 전부 가져오기 ({지역: [파일명]})
export async function getStaticProps() {
  const characterFiles = await getFileList('character')
  const itemFiles = await getFileList('items')
  const backgroundFiles = await getBackgroundList()

  return {
    props: { characterFiles, itemFiles, backgroundFiles }
  }
}

function Customize({ staticState, characterFiles, itemFiles, backgroundFiles }) {
  // 선택된 assets
  // 선택된 애들 명시적으로 (css) 표시해줄 수 있었으면 좋겠음... 귀찮다
  const [filteredCharacters, setFilteredCharacters] = useState({})
  const [filteredItems, setFilteredItems] = useState({})
  const [color, setColor] = useState(`${korToEng[Object.keys(staticState.result)[0]]}-1.svg`)
  const [items, setItems] = useState([])
  const [background, setBackground] = useState('')
  const router = useRouter()

  // 전역 state 값이 비어있으면 404 페이지로 이동
  useEffect(() => {
    if (staticState.caseId === -1 || staticState.sentences.length === 0) {
      router.push({ pathname: '/404', query: { code: '0001' } })
    }
  }, [])

  // 사용자 결과 3개에 맞게 필터링, 아이템은 '전체'까지 추가
  useEffect(() => {
    const location = Object.keys(staticState.result)
    const locationForItems = location.concat('전체')

    setFilteredCharacters(
      location.slice(0, 1).reduce((preValue, currentValue) => {
        return {
          ...preValue, [korToEng[currentValue]]: [...characterFiles[korToEng[currentValue]]]
        }
      }, {})
    )

    setFilteredItems(
      locationForItems.reduce((preValue, currentValue) => {
        return {
          ...preValue, [korToEng[currentValue]]: [...itemFiles[korToEng[currentValue]]]
        }
      }, {})
    )
  }, [])

  // 캐릭터 클릭시
  const handleColorChange = (file) => {
    setColor(file)
  }

  // 아이템 선택 3개 이상 방지, 두번 누르면 제거
  const handleItemChange = (location, file) => {
    const id = { 'use': [], 'notUse': [0, 1, 2] }
    const initialLength = items.length
    const isDuplication = items.filter(item => {
      if (item.location !== location || item.item !== file) {
        const idx = id.notUse.splice(id.notUse.indexOf(item.id), 1)[0]
        id.use.push(idx)
        return item
      }
    })
    const changedLength = isDuplication.length

    if (initialLength === changedLength && changedLength < 3) {
      setItems(isDuplication.concat({ location: location, item: file, id: id.notUse.shift() }))
    } else if (initialLength === changedLength) {
      alert('아이템은 3개 이상 추가할 수 없어요.')
      setItems(isDuplication)
    } else {
      setItems(isDuplication)
    }
  }

  const handleBackgroundChange = (file) => {
    setBackground(file)
  }

  const clickedButton = (event) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const canvasSize = getComputedStyle(document.querySelector('#canvas')).width.slice(0, -2)
    canvas.width = canvasSize
    canvas.height = canvasSize

    const imgAll = document.querySelectorAll('#canvas img')

    const useIdx = Object.keys(imgAll).filter(k => {
      if (!imgAll[k].className.includes('none')) {
        return k
      }
    })

    const storageRef = ref(storage, `${staticState.caseId}.png`)

    useIdx.forEach(idx => {
      const img = new Image()
      const style = imgAll[idx].style

      img.src = imgAll[idx].src
      img.onload = () => {
        context.drawImage(img, style.left.slice(0, -2), style.top.slice(0, -2), getComputedStyle(imgAll[idx]).width.slice(0, -2), getComputedStyle(imgAll[idx]).height.slice(0, -2))

        if (useIdx.slice(-1).includes(idx) === true) {
          canvas.toBlob(blob => {
            uploadBytes(storageRef, blob)
              .then((snapshot) => {
                getDownloadURL(storageRef)
                  .then((url) => {
                    patchRequest(`/${staticState.caseId}/image`, url)
                      .then((response) => {
                        const location = Object.keys(staticState.result)

                        router.push(`/share/${response.case_id}`)
                      })
                  })
              })
          }, 'image/png')
        }
      }
    })
  }

  return (
    <div id='test'>
      <Canvas color={color} items={items} background={background} firstLocation={korToEng[Object.keys(staticState.result)[0]]}></Canvas>
      <ItemSelector
        color={color}
        items={items}
        background={background}
        handleColorChange={handleColorChange}
        handleItemChange={handleItemChange}
        handleBackgroundChange={handleBackgroundChange}
        filteredCharacters={filteredCharacters}
        filteredItems={filteredItems}
        backgroundFiles={backgroundFiles}
      ></ItemSelector>
      <Button content='완성!' handler={clickedButton}></Button>
    </div>
  )
}

export default Customize