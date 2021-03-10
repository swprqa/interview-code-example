import { createSlice } from '@reduxjs/toolkit';
import { login } from '@redux/auth/actions';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {},
	reducers: {
		loginSuccess: (state) => state,
		loginError: (state) => state,
	},
	extraReducers: {
		[login.fulfilled]: (state) => state,
		[login.rejected]: (state) => state,
	},
});
