import { createReducer, on } from '@ngrx/store';
import * as UserAction from './user.actions';
import { UserState } from './user.state';

const initialUser: UserState = {
  user: null,
  loading: false,
  loaded: false,
};

export const userReducers = createReducer(
  initialUser,
  on(UserAction.login, (state, { userReq }): UserState => {
    return {
      ...state,
      user: {
        ...state.user,
        login: userReq.login,
        password: userReq.password,
      },
      loading: true,
      loaded: false,
    };
  }),
  on(UserAction.loginSuccess, (state, { token }): UserState => {
    return {
      ...state,
      user: {
        ...state.user,
        token: token.token,
      },
      loading: false,
      loaded: true,
    };
  }),
  on(UserAction.loginFail, (state): UserState => {
    return { ...state, loading: false, loaded: false };
  }),

  on(UserAction.logout, (state): UserState => {
    return { ...state, loading: true, loaded: false };
  }),
  on(UserAction.logoutSuccess, (state): UserState => {
    return {
      ...state,
      user: null,
      loading: false,
      loaded: true,
    };
  }),
  on(UserAction.logoutFail, (state, { fail }): UserState => {
    return { ...state, loading: false, loaded: false };
  }),

  on(UserAction.signup, (state, { userReq }): UserState => {
    return {
      ...state,
      user: {
        ...state.user,
        name: userReq.name,
        login: userReq.login,
        password: userReq.password,
      },
      loading: true,
      loaded: false,
    };
  }),
  on(UserAction.signupSuccess, (state, { userResp }): UserState => {
    return {
      ...state,
      user: {
        ...state.user,
        _id: userResp._id,
        name: userResp.name,
        login: userResp.login,
      },
      loading: false,
      loaded: true,
    };
  }),
  on(UserAction.signupFail, (state): UserState => {
    return { ...state, loading: false, loaded: false };
  }),

  on(UserAction.update, (state): UserState => {
    return { ...state, loading: true, loaded: false };
  }),
  on(UserAction.updateSuccess, (state, { userResp }): UserState => {
    return {
      ...state,
      user: {
        ...state.user,
        _id: userResp._id,
        name: userResp.name,
        login: userResp.login,
      },
      loading: false,
      loaded: true,
    };
  }),
  on(UserAction.updateFail, (state): UserState => {
    return { ...state, loading: false, loaded: false };
  }),

  on(UserAction.remove, (state): UserState => {
    return { ...state, loading: true, loaded: false };
  }),
  on(UserAction.removeSuccess, (state, { userResp }): UserState => {
    return {
      ...state,
      user: null,
      loading: false,
      loaded: true,
    };
  }),
  on(UserAction.removeFail, (state): UserState => {
    return { ...state, loading: false, loaded: false };
  }),

  on(UserAction.load, (state): UserState => {
    return { ...state, loading: true, loaded: false };
  }),
  on(UserAction.loadSuccess, (state, { userResp }): UserState => {
    return {
      ...state,
      user: {
        ...state.user,
        _id: userResp._id,
        name: userResp.name,
        login: userResp.login,
      },
      loading: false,
      loaded: true,
    };
  }),
  on(UserAction.loadFail, (state): UserState => {
    return { ...state, loading: false, loaded: false };
  }),
);
