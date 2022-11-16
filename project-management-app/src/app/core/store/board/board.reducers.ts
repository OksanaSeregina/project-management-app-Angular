import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
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
  on(BoardActions.deleteBoardSuccess, (state, { id }) => {
    return { ...state, boards: state.boards.filter((board) => board._id !== id) };
  }),
);

export function boardReducers(state: BoardState | undefined, action: Action) {
  return reducer(state, action);
}
