import styles from './button.module.css';

function Button({ content, color = 'orange', nightMode, margin, padding, disabled, handler }) {

  return (
    <button
      className={`
        ${styles.button}
        ${nightMode ? styles.nightMode : ''}
        ${styles[color]}
        ${styles[margin]}
        ${styles[padding]}
      `}
      disabled={disabled}
      onClick={handler}
    >
      {content}
    </button>
  )
}

export default Button;