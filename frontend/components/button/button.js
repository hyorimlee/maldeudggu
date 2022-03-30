import Link from 'next/link';
import styles from './button.module.css';

function Button({ link, content, color = 'orange', disabled }) {
  return (
    <Link href={link}>
      <button
        className={`${styles.button} ${styles[color]}`}
        disabled={disabled}
      >
        {content}
      </button>
    </Link>
  )
}

export default Button;