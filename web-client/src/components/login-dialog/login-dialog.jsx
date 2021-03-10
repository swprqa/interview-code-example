import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@components/dialog';
import { Button } from '@components/button';
import { TextInput } from '@components/inputs';
import { login } from '@redux/auth/actions';

export const LoginDialog = ({ isOpen, onClose }) => {
	const { handleSubmit, register } = useForm();
	const dispatch = useDispatch();

	const onSubmit = handleSubmit((values) => {
		dispatch(login(values));
	});

	return (
		<Dialog isOpen={isOpen} onClose={onClose} id="login-dialog">
			<DialogTitle>Log in</DialogTitle>
			<form onSubmit={onSubmit}>
				<DialogContent>
					<TextInput name="email" label="email" ref={register} />
					<TextInput name="password" label="password" ref={register} />
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Close</Button>
					<Button onClick={onSubmit}>Sign in</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
