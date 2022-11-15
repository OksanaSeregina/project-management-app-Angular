import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.state';

const selectFeature = createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(selectFeature, (state: UsersState) => state.users);

export const selectUserById = (id: string) =>
  createSelector(selectFeature, (state: UsersState) => {
    if (state.users) {
      return state.users.find(({ _id }) => _id === id);
    }
    return null;
  });
