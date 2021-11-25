function handler(req, res) {
	if (req.method === 'POST') {
		const { email, name, message } = req.body;

		if (
			!email ||
			!email.incluses('@') ||
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

		console.log(newMessage);

		return res.status(201).json({
			message: 'Successfully stored message!',
			message: newMessage,
		});
	}
}

export default handler;
