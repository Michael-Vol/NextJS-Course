import { getSession } from 'next-auth/client';

import { connectToDatabase } from '../../../lib/db';
import { verifyPassword, hashPassword } from '../../../lib/auth';
async function handler(req, res) {
	if (req.method !== 'PATCH') {
		return;
	}

	const session = await getSession({ req });

	if (!session) {
		client.close();
		return res.status(401).json({
			message: 'You are not authenticated.',
		});
	}

	const userEmail = session.user.email;
	const oldPassword = req.body.oldPassword;
	const newPassword = req.body.newPassword;

	const usersCollection = await connectToDatabase();

	const usersCollection = client.db().collection('users');

	const user = await usersCollection.findOne({ email: userEmail });

	if (!user) {
		client.close();
		return res.status(404).json({
			message: 'User not found.',
		});
	}

	const currentPassword = user.password;

	const password = verifyPassword(oldPassword, currentPassword);

	if (!password) {
		client.close();
		return res.status(403).json({
			message: 'Incorrect password.',
		});
	}

	newPassword = await hashPassword(newPassword);

	usersCollection.updateOne({ email: userEmail }, { $set: { password: newPassword } });

	client.close();
	return res.status(200).json({
		message: 'Password Updated',
	});
}

export default handler;
