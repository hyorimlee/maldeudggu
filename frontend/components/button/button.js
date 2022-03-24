import Link from 'next/link';
import classes from './button.module.css';

function Button(props) {
  return (
    <button className={classes.button}>
      <Link href={props.link}>
        {props.content}
      </Link>
    </button>
  )
}

export default Button;