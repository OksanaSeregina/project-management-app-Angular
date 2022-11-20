import { Action, createReducer, on, ActionReducer } from '@ngrx/store';
import * as CommonActions from './common.actions';
import { CommonState, initialCommonState } from './common.state';

const reducer: ActionReducer<CommonState> = createReducer(
  initialCommonState,
  on(CommonActions.loadLanguageSuccess, (state, { lang }) => {
    return { ...state, lang };
  }),
  on(CommonActions.updateLanguageSuccess, (state, { lang }) => {
    return { ...state, lang };
  }),
  on(CommonActions.loadSearchValueSuccess, (state, { searchValue }) => {
    return { ...state, searchValue };
  }),
  on(CommonActions.updateSearchValueSuccess, (state, { searchValue }) => {
    return { ...state, searchValue };
  }),
  on(CommonActions.loadSortBySuccess, (state, { sortBy }) => {
    return { ...state, sortBy };
  }),
  on(CommonActions.updateSortBySuccess, (state, { sortBy }) => {
    return { ...state, sortBy };
  }),
  on(CommonActions.loadIsListSuccess, (state, { isList }) => {
    return { ...state, isList };
  }),
  on(CommonActions.updateIsListSuccess, (state, { isList }) => {
    return { ...state, isList };
  }),
);

export function commonReducers(state: CommonState | undefined, action: Action) {
  return reducer(state, action);
}
