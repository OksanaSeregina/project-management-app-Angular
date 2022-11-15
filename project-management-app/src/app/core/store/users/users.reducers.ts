import { createReducer, on } from '@ngrx/store';
import { UsersState } from './users.state';
import * as UsersAction from './users.actions';

const initialUser: UsersState = {
  users: [],
  loading: false,
  loaded: false,
};

export const usersReducers = createReducer(
  initialUser,
  on(UsersAction.load, (state): UsersState => {
    return { ...state, loading: true, loaded: false };
  }),
  on(UsersAction.loadSuccess, (state, { usersResp }): UsersState => {
    return {
      ...state,
      users: [...usersResp],
      loading: false,
      loaded: true,
    };
  }),
  on(UsersAction.loadFail, (state): UsersState => {
    return { ...state, loading: false, loaded: false };
  }),
);
