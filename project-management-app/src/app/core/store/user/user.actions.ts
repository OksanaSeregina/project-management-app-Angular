import { createAction, props } from '@ngrx/store';
import { UserSigninReq, UserSignupReq, UserResp, UserToken } from '../../models/user.model';

export const LOGIN_USER = '[User] Login User';
export const LOGIN_USER_SUCCESS = '[User] Login User Success';
export const LOGIN_USER_FAIL = '[User] Login User Fail';
export const LOGOUT_USER = '[User] Logout User';
export const LOGOUT_USER_SUCCESS = '[User] Logout User Success';
export const LOGOUT_USER_FAIL = '[User] Logout User Fail';
export const SIGNUP_USER = '[User] Create User';
export const SIGNUP_USER_SUCCESS = '[User] Create User Success';
export const SIGNUP_USER_FAIL = '[User] Create User Fail';
export const UPDATE_USER = '[User] Update User';
export const UPDATE_USER_SUCCESS = '[User] Update User Success';
export const UPDATE_USER_FAIL = '[User] Update User Fail';
export const REMOVE_USER = '[User] Delete User';
export const REMOVE_USER_SUCCESS = '[User] Delete User Success';
export const REMOVE_USER_FAIL = '[User] Delete User Fail';
export const LOAD_USER = '[User] Load User';
export const LOAD_USER_SUCCESS = '[User] Load User Success';
export const LOAD_USER_FAIL = '[User] Load User Fail';
export const RESET_USER_DATA_STATE = '[User] Reset User data State';

export const login = createAction(LOGIN_USER, props<{ userReq: UserSigninReq }>());
export const loginSuccess = createAction(LOGIN_USER_SUCCESS, props<{ token: UserToken }>());
export const loginFail = createAction(LOGIN_USER_FAIL, props<{ fail: string | number }>());

export const logout = createAction(LOGOUT_USER, props<{ userReq?: string }>());
export const logoutSuccess = createAction(LOGOUT_USER_SUCCESS);
export const logoutFail = createAction(LOGOUT_USER_FAIL, props<{ fail: string }>());

export const signup = createAction(SIGNUP_USER, props<{ userReq: UserSignupReq }>());
export const signupSuccess = createAction(SIGNUP_USER_SUCCESS, props<{ userResp: UserResp }>());
export const signupFail = createAction(SIGNUP_USER_FAIL, props<{ fail: string }>());

export const update = createAction(UPDATE_USER, props<{ userReq: UserSignupReq }>());
export const updateSuccess = createAction(UPDATE_USER_SUCCESS, props<{ userResp: UserResp }>());
export const updateFail = createAction(UPDATE_USER_FAIL, props<{ fail: string }>());

export const remove = createAction(REMOVE_USER, props<{ userId: string }>());
export const removeSuccess = createAction(REMOVE_USER_SUCCESS, props<{ userResp: UserResp }>());
export const removeFail = createAction(REMOVE_USER_FAIL, props<{ fail: string }>());

export const load = createAction(LOAD_USER, props<{ userId: string }>());
export const loadSuccess = createAction(LOAD_USER_SUCCESS, props<{ userResp: UserResp }>());
export const loadFail = createAction(LOAD_USER_FAIL, props<{ fail: string }>());

export const resetDataState = createAction(RESET_USER_DATA_STATE, props<{ resetDats: string }>());
