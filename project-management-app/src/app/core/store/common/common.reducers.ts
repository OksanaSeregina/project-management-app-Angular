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
);

export function commonReducers(state: CommonState | undefined, action: Action) {
  return reducer(state, action);
}
