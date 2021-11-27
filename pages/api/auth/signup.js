import { connectToDatabase } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';

function handler(req, res) {
	const data = req.body;
	const { email, password } = data;

	if (!email || !email.includes('@') || !password || !password.trim().length < 7) {
		return res.status(422).json({
			message: 'Invalid input - password should also be at least 7 characters long',
		});
	}

	const client = connectToDatabase();
	const db = client.db();

	const hashedPassword = hashPassword(password);

	const res = await db.collection('users').insertOne({
		email,
		password: hashedPassword,
	});

	return res.status(201).json({
		message: 'Created user!',
	});
}

export default handler;
