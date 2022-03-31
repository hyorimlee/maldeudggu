import styles from './image.module.css'

/* 
- Description
  이미지 컴포넌트

- input
  type (string) : 이미지 컴포넌트 종류 (myCharacter | shareCharacter | items)
  path (string) : 이미지 경로
*/
function Image({ type, path, onClick }) {
  return (
    <>
      <img
        src={path}
        onClick={onClick}
        className={`${styles.image} ${styles[type]}`}
      ></img>
    </>
  )
}

export default Image