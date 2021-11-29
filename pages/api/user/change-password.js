import { getSession } from 'next-auth/client';

function handler(req, res) {
	if (req.method !== 'PATCH') {
		return;
	}

	const session = await getSession({ req });

	if (!session) {
		return res.status(401).json({
			message: 'You are not authenticated.',
		});
	}
}

export default handler;
