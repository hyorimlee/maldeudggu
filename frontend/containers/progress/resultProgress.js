import Progress from '../../components/progress/progress'
import Text from '../../components/text/text'

import styles from './resultprogress.module.css'

function ResultProgress({ result }) {
  return (
    <section className={styles.container}>
      <div className={styles.barContainer}>
        <Text contents={result[0][0]} size={16}></Text>
        <Progress percent={result[0][1]}></Progress>
      </div>
      <div className={styles.barContainer}>
        <Text contents={result[1][0]} size={16}></Text>
        <Progress percent={result[1][1]}></Progress>
      </div>
      <div className={styles.barContainer}>
        <Text contents={result[2][0]} size={16}></Text>
        <Progress percent={result[2][1]}></Progress>
      </div>
    </section>
  )
}

export default ResultProgress