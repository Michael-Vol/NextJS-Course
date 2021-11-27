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
		console.log(process.env.mongodb_dbname);
		const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.sq1ly.mongodb.net/${process.env.mongodb_dbname}?retryWrites=true&w=majority`;
		try {
			client = await MongoClient.connect(connectionString);
		} catch (error) {
			return res.status(500).json({
				message: 'Could not connect to database.',
			});
		}

		const db = client.db(process.env.mongodb_dbname);

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
