import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

const selectFeature = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(selectFeature, (state: UserState) => state.user);
