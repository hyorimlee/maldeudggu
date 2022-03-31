import { useState } from "react"

import styles from "./itemSelector.module.css"

import Text from "../../components/text/text"
import Image from "../../components/image/image"

function ItemSelector({ color, items, handleColorChange, handleItemChange, filteredCharacters, filteredItems }) {
  const [tab, setTab] = useState(0)

  // 현재 선택된 tab 바꾸기
  const handleTab = (tabIndex) => {
    setTab(tabIndex)
  }

  // 각 탭에 들어가는 이미지 grid
  const tabContent = () => {
    if (tab === 0) {
      const location = Object.keys(filteredCharacters)
      return (
        <div className={styles.grid}>
          {filteredCharacters[location[0]].map(character => {
            return (
              <Image
                key={character}
                type={'items'}
                path={`/img/character/${location[0]}/${character}`}
                onClick={() => handleColorChange(character)}
              ></Image>
            )
          })
          }
        </div >
      )
    }
    else if (tab === 1) {
      const locations = Object.keys(filteredItems)
      return (
        <div className={styles.grid}>
          {locations.map(location => filteredItems[location].map(item => {
            return (
              <Image
                key={item}
                type={'items'}
                path={`/img/items/${location}/${item}`}
                onClick={() => handleItemChange(location, item)}
              ></Image>
            )
          })
          )}
        </div>
      )
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <Text
          size={12}
          color={(tab === 0) ? 'orange' : 'grey'}
          bold={(tab === 0) ? true : false}
          margin={5}
          contents={'색'}
          onClick={() => handleTab(0)}
        ></Text>
        <Text
          size={12}
          color={(tab === 1) ? 'orange' : 'grey'}
          bold={(tab === 1) ? true : false}
          margin={5}
          contents={'아이템'}
          onClick={() => handleTab(1)}
        ></Text>
      </div>
      {tabContent()}
    </div>
  )
}

export default ItemSelector