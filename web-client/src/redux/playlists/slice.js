import { createSlice } from '@reduxjs/toolkit';
import { loadPlaylists } from '@redux/playlists/actions';

export const playlistsSlice = createSlice({
	name: 'playlists',
	initialState: {
		items: [],
	},
	reducers: {},
	extraReducers: {
		[loadPlaylists.fulfilled]: (state, action) => {
			state.items = action.payload;
		},
	},
});
