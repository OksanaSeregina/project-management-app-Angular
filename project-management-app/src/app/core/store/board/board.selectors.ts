import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState } from './board.state';

/**
 * Common state selector
 */
export const selectBoardState = createFeatureSelector<BoardState>('boards');

/**
 * Boards selector
 */
export const selectBoards = createSelector(selectBoardState, (state: BoardState) => state.boards);
