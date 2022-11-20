import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ColumnState } from './column.state';

/**
 * Common state selector
 */
export const selectColumnState = createFeatureSelector<ColumnState>('columns');

/**
 * Columns selector
 */
export const selectColumns = createSelector(selectColumnState, (state: ColumnState) => state.columns);
