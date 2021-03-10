import { createSelector } from '@reduxjs/toolkit';

export const playlistsStateSelector = (state) => state.playlists;

export const playlistsSelector = createSelector(playlistsStateSelector, (state) => state.items);
