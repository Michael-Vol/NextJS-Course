import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-util';

async function handler(req, res) {
	const { eventId } = req.query;

	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		return res.status(500).json({ message: 'Connecting to the DB failed!' });
	}

	if (req.method === 'POST') {
		const { email, name, text } = req.body;
		// add server-side validation

		if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
			return res.status(422).json({
				message: 'Invalid input.',
			});
			client.close();
		}

		const newComment = {
			email,
			name,
			text,
			eventId,
		};

		let result;
		try {
			result = await insertDocument(client, 'comments', newComment);
			newComment._id = result.insertedId;

			res.status(201).json({
				message: 'Added Comment.',
				comment: newComment,
			});
		} catch (error) {
			res.status(500).json({ message: 'Inserting Comment Failed!' });
		}
	}

	if (req.method === 'GET') {
		let documents;
		try {
			documents = await getAllDocuments(client, 'comments', { _id: -1 });

			res.status(200).json({
				comments: documents,
			});
		} catch (error) {
			return res.status(500).json({ message: 'Getting Comments failed!' });
		}
	}

	client.close();
}

export default handler;
