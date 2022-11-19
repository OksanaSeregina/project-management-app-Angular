import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from './user.state';

const initialUser: UserState = {
  user: null,
};

export const userReducers = createReducer(
  initialUser,
  on(UserActions.logoutSuccess, (state): UserState => {
    return {
      ...state,
      user: null,
    };
  }),
  on(UserActions.updateUserSuccess, (state, { userResp }): UserState => {
    return {
      ...state,
      user: {
        ...state.user,
        _id: userResp._id,
        name: userResp.name,
        login: userResp.login,
      },
    };
  }),
  on(UserActions.deleteUserSuccess, (state): UserState => {
    return {
      ...state,
      user: null,
    };
  }),
  on(UserActions.loadUserSuccess, (state, { userResp }): UserState => {
    return {
      ...state,
      user: {
        ...state.user,
        _id: userResp._id,
        name: userResp.name,
        login: userResp.login,
      },
    };
  }),
);
