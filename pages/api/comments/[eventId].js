import { MongoClient } from 'mongodb';

async function handler(req, res) {
	const eventId = req.query.eventId;

	const client = await MongoClient.connect(
		`mongodb+srv://admin:rimdus-cuxquS-1hobro@cluster0.sq1ly.mongodb.net/events?retryWrites=true&w=majority`
	);

	if (req.method === 'POST') {
		const { email, name, text } = req.body;
		//add server-side validation

		if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
			return res.status(422).json({
				message: 'Invalid input.',
			});
		}

		const newComment = {
			email,
			name,
			text,
			eventId,
		};

		const db = client.db();

		const result = await db.collection('comments').insertOne(newComment);

		newComment.id = result.insertedId;

		console.log(result);
		res.status(201).json({
			message: 'Added Comment.',
			comment: newComment,
		});
	}

	if (req.method === 'GET') {
		const dummyList = [
			{
				id: 'c1',
				name: 'Max',
				text: 'A first comment!',
			},
			{
				id: 'c2',
				name: 'Manuel',
				text: 'A second comment!',
			},
		];

		res.status(200).json({
			comments: dummyList,
		});
	}

	client.close();
}

export default handler;
