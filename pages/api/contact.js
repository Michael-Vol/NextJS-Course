import { MongoClient } from 'mongodb';

async function handler(req, res) {
	if (req.method === 'POST') {
		const { email, name, message } = req.body;

		if (
			!email ||
			!email.includes('@') ||
			!name ||
			name.trim() === '' ||
			!message ||
			message.trim() === ''
		) {
			return res.status(422).json({
				message: 'Invalid input.',
			});
		}

		//Store user data in a database

		const newMessage = {
			email,
			name,
			message,
		};
		let client;
		try {
			client = await MongoClient.connect(
				`mongodb+srv://admin:rimdus-cuxquS-1hobro@cluster0.sq1ly.mongodb.net/my-site?retryWrites=true&w=majority`
			);
		} catch (error) {
			return res.status(500).json({
				message: 'Could not connect to database.',
			});
		}

		const db = client.db('my-site');

		try {
			const result = await db.collection('messages').insertOne(newMessage);
			newMessage._id = result.insertedId;
		} catch (error) {
			client.close();
			return res.status(500).json({
				message: 'Storing message failed.',
			});
		}

		client.close();
		return res.status(201).json({
			message: 'Successfully stored message!',
			message: newMessage,
		});
	}
}

export default handler;
