import fs from 'fs/promises';
import path from 'path';
function HomePage(props) {
	const { products } = props;
	return (
		<ul>
			{products.map((product) => (
				<li key={product.id}>{product.title}</li>
			))}
		</ul>
	);
}

export async function getStaticProps(context) {
	console.log('Regenerating...');
	const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);

	if (data.products.length === 0) {
		return {
			notFound: true,
		};
	}

	if (!data) {
		return {
			redirect: {
				destination: '/no-data',
			},
		};
	}

	return {
		props: {
			products: data.products,
		},
		revalidate: 10,
	};
}

export default HomePage;
