import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IBoard } from '../../models';
import * as BoardActions from './board.actions';
import { BoardState, initialBoardState } from './board.state';

const reducer: ActionReducer<BoardState> = createReducer(
  initialBoardState,
  on(BoardActions.loadBoardsSuccess, (state, { boards }) => {
    return { ...state, boards };
  }),
  on(BoardActions.createBoardSuccess, (state, { board }) => {
    return { ...state, boards: [...state.boards, board] };
  }),
  on(BoardActions.updateBoardSuccess, (state, payload) => {
    const index: number = state.boards.findIndex((item) => item._id === payload.board._id);
    const boards: Array<IBoard> = [...state.boards.slice(0, index), payload.board, ...state.boards.slice(index + 1)];
    return { ...state, boards };
  }),
  on(BoardActions.deleteBoardSuccess, (state, payload) => {
    const index: number = state.boards.findIndex((item) => item._id === payload.id);
    const boards: Array<IBoard> = [...state.boards.slice(0, index), ...state.boards.slice(index + 1)];
    return { ...state, boards };
  }),
);

export function boardReducers(state: BoardState | undefined, action: Action) {
  return reducer(state, action);
}
