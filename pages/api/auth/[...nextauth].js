import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { connectToDatabase } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
	session: {
		jwt: true,
	},
	providers: [
		Providers.Credentials({
			async authorize(credentials) {
				const client = await connectToDatabase();

				const userCollection = client.db().collections('users');

				//check if user exists
				const user = userCollection.findOne({
					email: credentials.email,
				});

				if (!user) {
					//throw error if user not found
					client.close();
					throw new Error('User not found...');
				}

				//verify user password
				const isVerified = await verifyPassword(user.password, credentials.password);

				if (!isVerified) {
					//throw error if password is not verified
					client.close();
					throw new Error('The password is invalid...');
				}

				client.close();
				return { email: user.email };
			},
		}),
	],
});
