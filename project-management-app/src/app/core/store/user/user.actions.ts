import { createAction, props } from '@ngrx/store';
import { UserSigninReq, UserSignupReq, UserResp } from '../../models/user.model';

export const RESET_USER_DATA_STATE = '[User] Reset User data State';

export const loginUser = createAction('[User] LOGIN_USER', props<{ userReq: UserSigninReq }>());

export const logoutUser = createAction('[User] LOGOUT_USER');
export const logoutSuccess = createAction('[User]LOGOUT_USER_SUCCESS');

export const signupUser = createAction('[User] SIGNUP_USER', props<{ userReq: UserSignupReq }>());

export const updateUser = createAction('[User] UPDATE_USER', props<{ userReq: UserSignupReq }>());
export const updateUserSuccess = createAction('[User] UPDATE_USER_SUCCESS', props<{ userResp: UserResp }>());

export const deleteUser = createAction('[User] DELETE_USER', props<{ userId: string }>());
export const deleteUserSuccess = createAction('[User] DELETE_USER_SUCCESS');

export const loadUser = createAction('[User] LOAD_USER');
export const loadUserSuccess = createAction('[User] LOAD_USER_SUCCESS', props<{ userResp: UserResp }>());

export const resetDataState = createAction(RESET_USER_DATA_STATE, props<{ resetDats: string }>());
