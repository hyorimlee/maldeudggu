import { useState, useEffect } from "react"
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { firebaseConfig } from '../firebaseConfig'

import { getFileList } from "../modules/filelist"
import Canvas from '../containers/canvas/canvas'
import ItemSelector from "../containers/itemSelector/itemSelector"

// const province = ['gangwon', 'chungcheong', 'gyeonggi', 'gyeongsang', 'jeju', 'jeolla']

// 특정 폴더에서 이미지 이름 전부 가져오기 ({지역: [파일명]})
export async function getStaticProps() {
  const characterFiles = await getFileList('character')
  const itemFiles = await getFileList('items')
  return {
    props: { characterFiles, itemFiles }
  }
}

function Customize({ staticState, characterFiles, itemFiles }) {
  // 선택된 assets
  // 선택된 애들 명시적으로 (css) 표시해줄 수 있었으면 좋겠음... 귀찮다
  const [color, setColor] = useState('')
  const [items, setItems] = useState([])

  console.log(color)
  console.log(items)

  // 사용자 결과 지역 3개
  const location = staticState.myResult.map(element => {
    return element[0]
  })

  // object filtering
  Object.filter = (obj, predicate) =>
    Object.fromEntries(Object.entries(obj).filter(predicate))

  // characterFiles, itemFiles에서 필요한 장소에 해당하는 값만 남기기
  const filteredCharacters = Object.filter(characterFiles, ([key, val]) => key === location[0])
  const filteredItems = Object.filter(itemFiles, ([key, val]) => location.includes(key) === true)

  let firebaseApp
  let storage

  useEffect(() => {
    firebaseApp = initializeApp(firebaseConfig)
    storage = getStorage(firebaseApp);
  }, [])

  const handleColorChange = (file) => {
    setColor(file)
  }

  // 아이템 선택 3개 이상 방지, 두번 누르면 제거
  const handleItemChange = (location, file) => {
    const initialLength = items.length
    const isDuplication = items.filter(item => {
      if (item.location !== location || item.item !== file) {
        return item
      }
    })
    const changedLength = isDuplication.length
    if (initialLength === changedLength && changedLength < 3) {
      setItems(isDuplication.concat({ location: location, item: file }))
    } else {
      setItems(isDuplication)
    }
  }

  // const btnClicked = (event) => {
  //   const canvas = event.target
  //   const context = canvas.getContext('2d')

  //   const img = new Image()
  //   img.src = kakaoImage.src
  //   img.onload = () => {
  //     context.drawImage(img, 0, 0, 100, 100)

  //     canvas.toBlob(blob => {        
  //       const storageRef = ref(storage, 'test.png')
  //       uploadBytes(storageRef, blob).then((snapshot) => {
  //         getDownloadURL(storageRef).then((url) => {
  //           console.log(url)
  //         })
  //       })
  //     }, 'image/png')
  //   }
  // }

  return (
    <>
      <Canvas></Canvas>
      <ItemSelector
        color={color}
        items={items}
        handleColorChange={handleColorChange}
        handleItemChange={handleItemChange}
        filteredCharacters={filteredCharacters}
        filteredItems={filteredItems}
      ></ItemSelector>
    </>
  )
}

export default Customize