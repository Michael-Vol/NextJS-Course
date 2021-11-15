import { useRef, useState } from 'react';

function HomePage() {
	const emailInputRef = useRef();
	const feedbackInputRef = useRef();
	const [feedback, setFeedback] = useState([]);

	function submitFormHandler(event) {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredFeedback = feedbackInputRef.current.value;

		const reqBody = {
			email: enteredEmail,
			text: enteredFeedback,
		};
		fetch('/api/feedback', {
			method: 'POST',
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => console.log(data));
	}

	function loadFeedbackHandler() {
		fetch('/api/feedback')
			.then((response) => response.json())
			.then((data) => setFeedback(data.feedback));
	}

	return (
		<div>
			<h1>The Home Page</h1>
			<form>
				<div>
					<label htmlFor='email'>Your Email Address</label>
					<input type='email' id='email' ref={emailInputRef} />
				</div>
				<div>
					<label htmlFor='feedback'>Your Feedback</label>
					<textarea id='feedback' rows='5' ref={feedbackInputRef} />
				</div>
				<button onClick={submitFormHandler}>Send Feedback</button>
			</form>
			<button onClick={loadFeedbackHandler}>Load Feedback</button>

			<ul>
				{feedback.map((item) => (
					<li key={item.id}>{item.text}</li>
				))}
			</ul>
		</div>
	);
}

export default HomePage;
