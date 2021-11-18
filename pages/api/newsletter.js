import { MongoClient } from 'mongodb';

async function handler(req, res) {
	if (req.method === 'POST') {
		const userEmail = req.body.email;

		if (!userEmail || !userEmail.includes('@')) {
			return res.status(422).json({
				message: 'Invalid Email Address.',
			});
		}

		const client = await MongoClient.connect(
			`mongodb+srv://admin:rimdus-cuxquS-1hobro@cluster0.sq1ly.mongodb.net/events?retryWrites=true&w=majority`
		);

		const db = client.db();

		await db.collection('newsletter').insertOne({ email: userEmail });

		client.close();

		console.log(userEmail);
		res.status(201).json({ message: 'Signed up!' });
	}
}

export default handler;
