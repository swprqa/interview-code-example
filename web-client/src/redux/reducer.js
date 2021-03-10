import { combineReducers } from '@reduxjs/toolkit';

import { authSlice } from '@redux/auth/slice';
import { usersSlice } from '@pages/users/slice';
import { navigationSlice } from '@redux/navigation/slice';
import { playlistsSlice } from '@redux/playlists/slice';
import { tagsSlice } from '@redux/tags/slice';

export const reducer = combineReducers({
	auth: authSlice.reducer,
	users: usersSlice.reducer,
	playlists: playlistsSlice.reducer,
	tags: tagsSlice.reducer,
	navigation: navigationSlice.reducer,
});
