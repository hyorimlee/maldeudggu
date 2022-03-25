import styles from './image.module.css'

export async function getServerSideProps() {
  // 백엔드 서버에서 저장된 이미지를 로드해와야 함
  
  return {
    props : {
      imagePaths : []
    }
  }
}

function Image({ imagePaths }) {
  let images = imagePaths.map(path => {
    return (
      <img className={styles.image} src={path}></img>
    )
  })
  
  return (
    <>
      {images}
    </>
  )
}

export default Image