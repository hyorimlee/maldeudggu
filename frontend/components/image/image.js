import styles from './image.module.css'

/* 
- Description
  이미지 컴포넌트

- input
  type (string) : 이미지 컴포넌트 종류 (myCharacter | shareCharacter | items)
  path (string) : 이미지 경로
*/
function Image({ type, path }) {
  return (
    <>
      <img className={`${styles.image} ${styles[type]}`} src={path}></img>
    </>
  )
}

export default Image