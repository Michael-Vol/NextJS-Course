import Link from 'next/link';
import Image from 'next/image';

import classes from './posts-item.module.css';

function PostItem(props) {
	const { title, image, excerpt, date, slug } = props.post;

	const imagePath = `/images/posts/${slug}/${image}`;
	const formattedDate = new Date(date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
	return (
		<li>
			<Link>
				<a>
					<div className={classes.image}>
						<Image src='' alt={title} width={300} height={200} />
					</div>
					<div className={classes.content}>
						<h3>{title}</h3>
						<time>{formattedDate}</time>
						<p>{excerpt}</p>
					</div>
				</a>
			</Link>
		</li>
	);
}

export default PostItem;
