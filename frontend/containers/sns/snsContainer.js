import SNS from '../../components/image/sns/sns'

import styles from './snsContainer.module.css'

function SNSContainer({ onClick, staticState }) {
  return (
    <section className={styles.container}>
      <SNS type='twitter' onClick={onClick}></SNS>
      <SNS type='facebook' onClick={onClick}></SNS>
      <SNS type='kakao' onClick={onClick}></SNS>
      <SNS type={staticState.settings.nightMode ? 'link_night' : 'link'} onClick={onClick}></SNS>
      <SNS type={staticState.settings.nightMode ? 'download_night' : 'download'} onClick={onClick}></SNS>
    </section>
  )
}

export default SNSContainer