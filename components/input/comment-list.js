import classes from './comment-list.module.css';

function CommentList(props) {
	const { items } = props;
	return (
		<ul className={classes.comments}>
			{items.map((item) => (
				<li key={item.id}>
					<p>{item.text}</p>
					By <address>{item.name}</address>
				</li>
			))}
			{/* <li>
				<p>My comment is amazing!</p>
				<div>
					By <address>Maximilian</address>
				</div>
			</li>
			<li>
				<p>My comment is amazing!</p>
				<div>
					By <address>Maximilian</address>
				</div>
			</li> */}
		</ul>
	);
}

export default CommentList;
