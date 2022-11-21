import { createAction, props } from '@ngrx/store';
import { IBoard } from '../../models';

/**
 * Board state actions
 */
export const loadBoards = createAction('[Board] LOAD_BOARDS');
export const loadBoardsSuccess = createAction('[Board] LOAD_BOARDS_SUCCESS', props<{ boards: IBoard[] }>());

export const createBoard = createAction('[Board] CREATE_BOARD', props<{ board: Pick<IBoard, 'title'> }>());
export const createBoardSuccess = createAction('[Board] CREATE_BOARD_SUCCESS', props<{ board: IBoard }>());

export const updateBoard = createAction('[Board] UPDATE_BOARD', props<{ board: IBoard }>());
export const updateBoardSuccess = createAction('[Board] UPDATE_BOARD_SUCCESS', props<{ board: IBoard }>());

export const deleteBoard = createAction('[Board] DELETE_BOARD', props<{ id: string }>());
export const deleteBoardSuccess = createAction('[Board] DELETE_BOARD_SUCCESS', props<{ id: string }>());
