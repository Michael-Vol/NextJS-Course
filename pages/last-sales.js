import { useEffect, useState } from 'react';
import useSWR from 'swr';
function LastSalesPage() {
	const [sales, setSales] = useState();
	// const [isLoading, setIsLoading] = useState(false);
	const fetcher = (url) => fetch(url).then((r) => r.json());
	const { data, error } = useSWR('https://nextjs-course-87190-default-rtdb.firebaseio.com/sales.json', fetcher);

	useEffect(() => {
		if (data) {
			const transformedSales = [];
			for (const key in data) {
				transformedSales.push({
					id: key,
					username: data[key].username,
					volume: data[key].volume,
				});
			}
			setSales(transformedSales);
		}
	}, [data]);

	if (error) {
		return <p>Failed to load</p>;
	}
	if (!data || !sales) {
		return <p>Loading...</p>;
	}

	return (
		<ul>
			{sales.map((sale) => (
				<li key={sale.id}>
					{sale.username} - ${sale.volume}
				</li>
			))}
		</ul>
	);
}

export default LastSalesPage;
