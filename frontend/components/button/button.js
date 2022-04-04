import styles from './button.module.css';

function Button({ link, content, color = 'orange', disabled, handler }) {

  return (
    <button
      className={`${styles.button} ${styles[color]}`}
      disabled={disabled}
      onClick={handler}
    >
      {content}
    </button>
  )
}

export default Button;