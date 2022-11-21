import { createAction, props } from '@ngrx/store';
import { IColumn } from '../../models';

/**
 * Column state actions
 */
export const loadColumns = createAction('[Column] LOAD_COLUMNS', props<{ boardId: string }>());
export const loadColumnsSuccess = createAction('[Column] LOAD_COLUMNS_SUCCESS', props<{ columns: IColumn[] }>());

export const createColumn = createAction(
  '[Column] CREATE_COLUMN',
  props<{ boardId: string; column: Pick<IColumn, 'title' | 'order'> }>(),
);
export const createColumnSuccess = createAction('[Column] CREATE_COLUMN_SUCCESS', props<{ column: IColumn }>());

export const updateColumn = createAction(
  '[Column] UPDATE_COLUMN',
  props<{ boardId: string; column: Pick<IColumn, '_id' | 'title' | 'order'> }>(),
);
export const updateColumnSuccess = createAction('[Column] UPDATE_COLUMN_SUCCESS', props<{ column: IColumn }>());

export const deleteColumn = createAction('[Column] DELETE_COLUMN', props<{ boardId: string; columnId: string }>());
export const deleteColumnSuccess = createAction('[Column] DELETE_COLUMN_SUCCESS', props<{ id: string }>());
