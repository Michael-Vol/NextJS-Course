import { connectToDatabase } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';

async function handler(req, res) {
	if (req.method !== 'POST') {
		return;
	}

	const data = req.body;
	const { email, password } = data;

	if (!email || !email.includes('@') || !password || password.trim().length < 7) {
		return res.status(422).json({
			message: 'Invalid input - password should also be at least 7 characters long',
		});
	}
	const client = await connectToDatabase();
	const db = client.db();

	const existingUser = await db.collection('users').findOne({ email });

	if (existingUser) {
		return res.status(422).json({
			message: 'User already exists!',
		});
	}

	const hashedPassword = await hashPassword(password);

	const response = await db.collection('users').insertOne({
		email,
		password: hashedPassword,
	});

	return res.status(201).json({
		message: 'Created user!',
	});
}

export default handler;
