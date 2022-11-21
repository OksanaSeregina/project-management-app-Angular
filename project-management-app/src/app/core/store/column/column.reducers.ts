import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IColumn } from '../../models';
import * as ColumnActions from './column.actions';
import { ColumnState, initialColumnState } from './column.state';

const reducer: ActionReducer<ColumnState> = createReducer(
  initialColumnState,
  on(ColumnActions.loadColumnsSuccess, (state, { columns }) => {
    return { ...state, columns };
  }),
  on(ColumnActions.createColumnSuccess, (state, { column }) => {
    return { ...state, columns: [...state.columns, column] };
  }),
  on(ColumnActions.updateColumnSuccess, (state, payload) => {
    const index: number = state.columns.findIndex((item) => item._id === payload.column._id);
    const columns: IColumn[] = [...state.columns.slice(0, index), payload.column, ...state.columns.slice(index + 1)];
    return { ...state, columns };
  }),
  on(ColumnActions.deleteColumnSuccess, (state, { id }) => {
    const index: number = state.columns.findIndex((item) => item._id === id);
    const columns: IColumn[] = [...state.columns.slice(0, index), ...state.columns.slice(index + 1)];
    return { ...state, columns };
  }),
);

export function columnReducers(state: ColumnState | undefined, action: Action) {
  return reducer(state, action);
}
