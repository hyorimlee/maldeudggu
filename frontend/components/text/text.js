import styles from './text.module.css'

/*
bold      : '' | bold
color     : '' | grey | white | orange
contents  : string
size      : 12 | 14 (기본값) | 16 | 18 | 20 | 22
*/
function Text({ bold, color, contents, size = 14, onClick, margin }) {
  return (
    <>
      <p
        onClick={onClick}
        className={`${size === 12 ? styles.p12 : size === 14 ? styles.p14 : size === 16 ? styles.p16 : size === 18 ? styles.p18 : size === 20 ? styles.p20 : styles.p22}
                    ${bold ? styles.bold : ''}
                    ${color === 'grey' ? styles.grey : color === 'white' ? styles.white : color === 'orange' ? styles.orange : ''}
                    ${margin === 5 ? styles.m5 : ''}
                  `}>
        {contents}
      </p>
    </>
  )
}

export default Text