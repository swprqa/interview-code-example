import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTags } from '@redux/tags/api';

export const loadTags = createAsyncThunk('tags/load', fetchTags);
