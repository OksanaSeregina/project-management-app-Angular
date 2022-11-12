import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommonState } from './common.state';

/**
 * Common state selector
 */
export const selectCommonState = createFeatureSelector<CommonState>('common');

/**
 * Language selector
 */
export const selectLanguage = createSelector(selectCommonState, (state: CommonState) => state.lang);
