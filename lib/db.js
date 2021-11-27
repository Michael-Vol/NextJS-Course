import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
	const client = await MongoClient.connect(
		`mongodb+srv://admin:rimdus-cuxquS-1hobro@cluster0.sq1ly.mongodb.net/next-auth-demo?retryWrites=true&w=majority`
	);
	return client;
}
