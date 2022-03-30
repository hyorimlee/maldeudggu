import Image from '../../components/image/image'
import styles from './sharedImages.module.css'

function SharedImages({ data }) {
  let images = data.map(d => {
    return (
      <Image path={d.image_url} />
    )
  })
  console.log(data)

  return (
    <article className={styles.container}>
      {images}
    </article>
  )
}

export default SharedImages