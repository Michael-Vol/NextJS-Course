import { Fragment } from 'react';
import Head from 'next/head';

import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-util';
function AllPostsPage(props) {
	return (
		<Fragment>
			<Head>
				<title>All posts</title>
				<meta name='description' content='All coding tutorials are included in this page.' />
			</Head>
			<AllPosts posts={props.posts} />;
		</Fragment>
	);
}

export function getStaticProps() {
	const allPosts = getAllPosts();

	return {
		props: {
			posts: allPosts,
		},
	};
}

export default AllPostsPage;
