import { MongoClient } from 'mongodb';

async function connectDatabase() {
	const client = await MongoClient.connect(
		`mongodb+srv://admin:rimdus-cuxquS-1hobro@cluster0.sq1ly.mongodb.net/events?retryWrites=true&w=majority`
	);
	return client;
}

async function insertDocument(client, document) {
	const db = client.db();

	await db.collection('newsletter').insertOne(document);
}

async function handler(req, res) {
	if (req.method === 'POST') {
		const userEmail = req.body.email;

		if (!userEmail || !userEmail.includes('@')) {
			return res.status(422).json({
				message: 'Invalid Email Address.',
			});
		}

		let client;
		try {
			client = await connectDatabase();
		} catch (error) {
			return res.status(500).json({ message: 'Connecting to the database failed' });
		}

		try {
			await insertDocument(client, { email: userEmail });
			client.close();
		} catch (error) {
			return res.status(500).json({ message: 'Inserting data failed' });
		}

		console.log(userEmail);
		res.status(201).json({ message: 'Signed up!' });
	}
}

export default handler;
