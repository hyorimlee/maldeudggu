import styles from './text.module.css'

export default function Text({ bold, color, contents, size=16 }) {
  return (
    <>
      <p
        className={`${size === 12 ? styles.p12 : size === 16 ? styles.p16 : size === 18 ? styles.p18 : styles.p24}
                    ${bold ? styles.bold : ''}
                    ${color === 'grey' ? styles.grey : color === 'white' ? styles.white : color === 'orange' ? styles.orange : ''}
                  `}>
        {contents}
      </p>
    </>
  )
}