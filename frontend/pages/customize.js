import { useState, useEffect } from "react"
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { firebaseConfig } from '../firebaseConfig'

import { getFileList } from "../modules/filelist"
import ItemSelector from "../containers/itemSelector/itemSelector"

const location = ['gangwon', 'chungcheong', 'gyeonggi']

// 특정 폴더에서 이미지 이름 전부 가져오기 (character, items)
export async function getServerSideProps() {
  const characterFiles = {
    [location[0]]: await getFileList('character', location[0])
  }
  const itemFiles = {
    [location[0]]: await getFileList('items', location[0]),
    [location[1]]: await getFileList('items', location[1]),
    [location[2]]: await getFileList('items', location[2])
  }
  return {
    props: { characterFiles, itemFiles }
  }
}

function Customize({ characterFiles, itemFiles }) {
  // asset selected
  const [color, setColor] = useState('') // 파일 그 자체? 파일 이름? = idx?
  const [items, setItems] = useState([]) // 최대 3개

  let firebaseApp
  let storage

  useEffect(() => {
    firebaseApp = initializeApp(firebaseConfig)
    storage = getStorage(firebaseApp);
  }, [])

  const handleColorChange = (idx) => {
    setColor(idx)
  }

  const handleItemChange = (idx) => {
    setItems(items.push(idx))
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
      <ItemSelector
        color={color}
        items={items}
        handleColorChange={handleColorChange}
        handleItemChange={handleItemChange}
        characterFiles={characterFiles}
        itemFiles={itemFiles}
      ></ItemSelector>
    </>
  )
}

export default Customize