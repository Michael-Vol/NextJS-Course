import { Fragment } from 'react';
import Head from 'next/head';

import PostContent from '../../components/post-detail/post-content';
import { getPostData } from '../../lib/posts-util';
import { getPostsFiles } from '../../lib/posts-util';

function PostDetailPage(props) {
	return (
		<Fragment>
			<Head>
				<title>{props.post.title}</title>
				<meta name='description' content={props.post.excerpt} />
			</Head>
			<PostContent post={props.post} />;
		</Fragment>
	);
}

export function getStaticProps(context) {
	const { params } = context;
	const { slug } = params;

	// const postData = getPostData(slug);
	const postData = getPostData(slug);

	return {
		props: {
			post: postData,
		},
		revalidate: 600,
	};
}

export function getStaticPaths() {
	const postFilenames = getPostsFiles();
	const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ''));

	return {
		paths: slugs.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}

export default PostDetailPage;
