import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { reducer } from './reducer';

const middleware = [...getDefaultMiddleware()];

const makeStore = () =>
	configureStore({
		reducer: reducer,
		middleware,
		devTools: true,
	});

export const wrapper = createWrapper(makeStore);
