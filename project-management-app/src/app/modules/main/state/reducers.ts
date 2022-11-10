import { createReducer, on } from '@ngrx/store';

import * as CardActions from './actions';
import { Border } from '../models/models';
// import { BorderState } from './state';

export const initialState: Border[] = [];

export const addCardReducer = createReducer(
  initialState,
  on(CardActions.addBorder, (state, { cardBorder }) => [...state, cardBorder]),
);

export const RemoveCardReducer = createReducer(
  initialState,
  on(CardActions.removeBorder, (state, { cardId }) => state.filter((border) => border.id !== cardId)),
);
