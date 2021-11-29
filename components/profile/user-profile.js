import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { useSession, getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';

async function onChangePasswordHandler(passwordData) {
	const res = await fetch('/api/user/change-password', {
		method: 'PATCH',
		body: JSON.stringify(passwordData),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = await res.json();
	console.log(data);
}

function UserProfile() {
	return (
		<section className={classes.profile}>
			<h1>Your User Profile</h1>
			<ProfileForm onChangePassword={onChangePasswordHandler} />
		</section>
	);
}

export default UserProfile;
