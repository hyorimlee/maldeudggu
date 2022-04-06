import Progress from '../../components/progress/progress'
import Text from '../../components/text/text'

import styles from './resultprogress.module.css'

function ResultProgress({ result, staticState }) {
  return (
    <section className={`${styles.container} ${staticState.settings.nightMode ? styles.nightMode : ''}`}>
      <div className={styles.barContainer}>
        <Text bold contents={result[0][0]}></Text>
        <Progress percent={result[0][1]}></Progress>
      </div>
      <div className={styles.barContainer}>
        <Text bold contents={result[1][0]}></Text>
        <Progress percent={result[1][1]}></Progress>
      </div>
      <div className={styles.barContainer}>
        <Text bold contents={result[2][0]}></Text>
        <Progress percent={result[2][1]}></Progress>
      </div>
    </section>
  )
}

export default ResultProgress