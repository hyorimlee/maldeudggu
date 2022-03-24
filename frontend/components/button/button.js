import Link from 'next/link';
import classes from './button.module.css';

function Button(props) {
  return (
    <Link href={props.link}>
      <button className={classes.button}>
        {props.content}
      </button>
    </Link>
  )
}

export default Button;