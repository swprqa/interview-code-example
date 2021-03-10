import { createSlice } from '@reduxjs/toolkit';
import { loadTags } from '@redux/tags/actions';

export const tagsSlice = createSlice({
	name: 'tags',
	initialState: {
		items: [],
		types: [],
	},
	reducers: {},
	extraReducers: {
		[loadTags.fulfilled]: (state, action) => {
			state.items = action.payload;
		},
	},
});
