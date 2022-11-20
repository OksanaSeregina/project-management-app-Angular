import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommonState } from './common.state';

/**
 * Common state selector
 */
export const selectCommonState = createFeatureSelector<CommonState>('common');

export const selectLanguage = createSelector(selectCommonState, (state: CommonState) => state.lang);
export const selectSearchValue = createSelector(selectCommonState, (state: CommonState) => state.searchValue);
export const selectSortBy = createSelector(selectCommonState, (state: CommonState) => state.sortBy);
export const selectIsList = createSelector(selectCommonState, (state: CommonState) => state.isList);
