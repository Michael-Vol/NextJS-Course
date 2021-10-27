import { getFeaturedEvents } from '../data/dummy-data';

function HomePage() {
	const featuredEvents = getFeaturedEvents();
	return (
		<div>
			<h1>The HomePage</h1>
		</div>
	);
}

export default HomePage;
