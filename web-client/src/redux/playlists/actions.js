import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPlaylists } from '@redux/playlists/api';

export const loadPlaylists = createAsyncThunk('playlists/load', fetchPlaylists);
