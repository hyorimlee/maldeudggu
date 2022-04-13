import Image from '../../components/image/image'
import styles from './sharedImages.module.css'

function SharedImages({ data, staticState }) {
  let images = data.map((d, idx) => {
    return (
      <Image path={d.image_url} key={idx} type={staticState.settings.nightMode ? 'nightModeSharedImage' : 'sharedImage'} />
    )
  })

  return (
    <div className={styles.container}>
      {images}
    </div>
  )
}

export default SharedImages