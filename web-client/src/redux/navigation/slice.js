import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
	name: 'sidenav',
	initialState: {
		isOpen: false,
	},
	reducers: {
		open: (state) => {
			state.isOpen = true;
		},
		close: (state) => {
			state.isOpen = false;
		},
		toggle: (state) => {
			state.isOpen = !state.isOpen;
		},
	},
});
