import { createSelector } from '@reduxjs/toolkit';

export const tagsStateSelector = (state) => state.tags;

export const tagsSelector = createSelector(tagsStateSelector, (state) => state.items);
export const tagTypesSelector = createSelector(tagsStateSelector, (state) => state.types);
