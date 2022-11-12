import { createReducer, on } from '@ngrx/store';

import * as CardActions from './actions';
import { Border } from '../models/models';
// import { BorderState } from './state';

export const BORDER_FEATURE_NAME = 'borderState';

export const initialState: Border[] = [];

export const CardReducer = createReducer(
  initialState,
  on(CardActions.addBorder, (state, { cardBorder }) => [...state, cardBorder]),
  on(CardActions.removeBorder, (state, { titleBorder }) => state.filter((border) => border.title !== titleBorder)),
);
