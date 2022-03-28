import Image from '../../components/image/image'
import { getRequest } from '../../modules/fetch'
import styles from './sharedImages.module.css'

export async function getServerSideProps() {
  // 백엔드 서버에서 저장된 이미지를 로드해와야 함
  const response = await getRequest('/shared')
  const data = await response.json()
  
  
  return {
    props : {
      imagePaths
    }
  }
}

function SharedImages({ imagePaths }) {
  let images = imagePaths.map(path => {
    return (
      <Image path={path} />
    )
  })

  return (
    <article className={styles.container}>
      {images}
    </article>
  )
}

export default SharedImages