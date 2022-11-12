import { createAction, props } from '@ngrx/store';

import { Border } from '../models/models';

const borderActionSourse = '[userReducer]';

export const addBorder = createAction(`${borderActionSourse} Add Border`, props<{ cardBorder: Border }>());

export const removeBorder = createAction(`${borderActionSourse} Remove Border`, props<{ titleBorder: string }>());
