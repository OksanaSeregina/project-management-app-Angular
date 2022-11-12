import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Border } from '../models/models';

export const selectCardStore = createFeatureSelector<Border[]>('borderState');

export const selectCard = createSelector(selectCardStore, (borderState: Border[]) => {
  return borderState.filter((res: Border) => res !== undefined);
});
