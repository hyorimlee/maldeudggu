import { useState } from "react"

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

  const handleColorChange = (idx) => {
    setColor(idx)
  }

  const handleItemChange = (idx) => {
    setItems(items.push(idx))
  }

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