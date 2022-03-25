import Link from 'next/link';
import styles from './button.module.css';

function Button({link, content}) {
  return (
    <Link href={link}>
      <button className={styles.button}>
        {content}
      </button>
    </Link>
  )
}

export default Button;