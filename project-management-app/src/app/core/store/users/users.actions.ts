import { createAction, props } from '@ngrx/store';
import { UserResp } from '../../models';

export const LOAD_USERS = '[User] Load Users';
export const LOAD_USERS_SUCCESS = '[User] Load Users Success';
export const LOAD_USERS_FAIL = '[User] Load Users Fail';
export const RESET_USER_DATA_STATE = '[User] Reset User data State';

export const load = createAction(LOAD_USERS);
export const loadSuccess = createAction(LOAD_USERS_SUCCESS, props<{ usersResp: UserResp[] }>());
export const loadFail = createAction(LOAD_USERS_FAIL, props<{ fail: string }>());

export const resetDataState = createAction(RESET_USER_DATA_STATE, props<{ reset?: string }>());
