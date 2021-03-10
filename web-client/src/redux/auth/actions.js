import { createAsyncThunk } from '@reduxjs/toolkit';

import { addFetchMiddleware, apiRequest } from '@utils/fetch';

const loginQuery = ({ email, password }) => `mutation {
  signIn(email: "${email}", password: "${password}", authClient: "WEB"){
    accessToken, refreshToken,
  }
}`;

const requestLogin = async (payload) => apiRequest({ query: loginQuery(payload) });

export const addAuthMiddleware = (tokens) => {
	addFetchMiddleware((options) => ({
		...options,
		headers: {
			...options.headers,
			Authorization: tokens.accessToken,
			'Authorization-Refresh': tokens.refreshToken,
		},
	}));
};

export const login = createAsyncThunk('auth/login', async (payload) => {
	const tokens = await requestLogin(payload);
});
