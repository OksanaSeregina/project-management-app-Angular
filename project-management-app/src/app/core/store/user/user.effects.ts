import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { selectUser } from './user.selectors';
import * as UserAction from './user.actions';
import { UserState } from './user.state';
import { UserService } from '../../../modules/user/services/user.service';
import { UserResp, UserSigninReq, UserSignupReq, UserToken } from '../../models';
import { TokenService } from '../../services/token.service';
import { NotificationActions } from '../notification';
import { StorageService } from '../../services';

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private store: Store<UserState>,
    private authService: AuthService,
    private userService: UserService,
    private tokenService: TokenService,
    private storageService: StorageService,
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAction.LOGIN_USER),
      switchMap(({ userReq }: { userReq: UserSigninReq }) => {
        return this.authService.signin(userReq).pipe(
          tap((token: UserToken) => {
            this.storageService.set('token', token.token);
            this.router.navigate(['main']);
          }),
          map((token: UserToken) => {
            return UserAction.loginSuccess({ token });
          }),
          catchError((err) => {
            const fail = err.message;
            return of(
              NotificationActions.showFailToast({ message: 'board.delete_board_fail_message' }),
              UserAction.loadFail({ fail }),
            );
          }),
        );
      }),
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAction.LOGOUT_USER),
      switchMap(() => {
        this.storageService.remove('token');
        this.router.navigate(['welcome']);
        return of(UserAction.logoutSuccess());
      }),
      catchError((err) => {
        const fail = err.message;
        return of(
          NotificationActions.showFailToast({ message: 'board.delete_board_fail_message' }),
          UserAction.loadFail({ fail }),
        );
      }),
    );
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAction.SIGNUP_USER),
      switchMap(({ userReq }: { userReq: UserSignupReq }) => {
        return this.authService.signup(userReq).pipe(
          tap(() => this.router.navigate(['main'])),
          map((userResp: UserResp) => {
            return UserAction.signupSuccess({ userResp });
          }),
          catchError((err) => {
            const fail = err.message;
            return of(
              NotificationActions.showFailToast({ message: 'board.delete_board_fail_message' }),
              UserAction.loadFail({ fail }),
            );
          }),
        );
      }),
    );
  });

  signupSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAction.SIGNUP_USER_SUCCESS),
      switchMap(({ userResp }: { userResp: UserResp }) => {
        const userReq = {
          login: '',
          password: '',
        };
        this.store.select(selectUser).subscribe((user) => {
          userReq.password = user?.password as string;
          userReq.login = user?.login as string;
        });
        return this.authService.signin(userReq).pipe(
          tap((token) => {
            this.storageService.set('token', token.token);
            this.router.navigate(['main']);
          }),
          map((token) => {
            return UserAction.loginSuccess({ token });
          }),
          catchError((err) => {
            const fail = err.message;
            return of(
              NotificationActions.showFailToast({ message: 'board.delete_board_fail_message' }),
              UserAction.loadFail({ fail }),
            );
          }),
        );
      }),
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAction.UPDATE_USER),
      switchMap(({ userReq }: { userReq: UserSignupReq }) => {
        const token = this.tokenService.getDataByToken();
        let id = '';
        if (token) {
          id = token.id;
        }
        return this.userService.update(userReq, id).pipe(
          tap(() => this.router.navigate(['main'])),
          /**
           * Check the feature
           */
          tap((userResp: UserResp) => console.log('Update that user: ', userResp)),
          map((userResp: UserResp) => {
            return UserAction.updateSuccess({ userResp });
          }),
          catchError((err) => {
            const fail = err.message;
            return of(
              NotificationActions.showFailToast({ message: 'board.delete_board_fail_message' }),
              UserAction.loadFail({ fail }),
            );
          }),
        );
      }),
    );
  });

  remove$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAction.REMOVE_USER),
      switchMap(() => {
        const id = this.tokenService.getDataByToken()?.id as string;
        return this.userService.remove(id).pipe(
          tap(() => {
            this.storageService.remove('token');
            this.router.navigate(['welcome']);
          }),
          /**
           * Check the feature
           */
          tap((userResp: UserResp) => console.log('Remove that user: ', userResp)),
          map((userResp: UserResp) => {
            return UserAction.removeSuccess({ userResp });
          }),
          catchError((err) => {
            const fail = err.message;
            return of(
              NotificationActions.showFailToast({ message: 'board.delete_board_fail_message' }),
              UserAction.loadFail({ fail }),
            );
          }),
        );
      }),
    );
  });

  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAction.LOAD_USER),
      switchMap(() => {
        const id = this.tokenService.getDataByToken()?.id as string;
        return this.userService.loadUser('id').pipe(
          /**
           * Check the feature
           */
          tap((userResp: UserResp) => console.log('Current user: ', userResp)),
          map((userResp: UserResp) => {
            return UserAction.loadSuccess({ userResp });
          }),
          catchError((err) => {
            const fail = err.message;
            return of(
              NotificationActions.showFailToast({ message: 'board.delete_board_fail_message' }),
              UserAction.loadFail({ fail }),
            );
          }),
        );
      }),
    );
  });
}
