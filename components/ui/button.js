import classes from './button.module.css';
import Link from 'next/link';
function Button(props) {
	return (
		<Link href={props.link}>
			<a className={classes.btn}>{props.children}</a>
		</Link>
	);
}

export default Button;
