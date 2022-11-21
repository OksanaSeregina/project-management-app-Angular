import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { UserResp, UserSigninReq, UserSignupReq, UserToken } from '../../models';
import { AuthService, StorageService, TokenService, UserService } from '../../services';
import { NotificationActions } from '../notification';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  public loginUser$: Observable<Action>;
  public logoutUser$: Observable<Action>;
  public signupUser$: Observable<Action>;
  public updateUser$: Observable<Action>;
  public deleteUser$: Observable<Action>;
  public loadUser$: Observable<Action>;

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private authService: AuthService,
    private userService: UserService,
    private tokenService: TokenService,
    private storageService: StorageService,
  ) {
    this.loginUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.loginUser),
        switchMap(({ userReq }: { userReq: UserSigninReq }) => {
          return this.authService.signin(userReq).pipe(
            map((token: UserToken) => {
              this.storageService.set('token', token.token);
              return UserActions.loadUser();
            }),
            catchError(() => {
              return of(NotificationActions.showFailToast({ message: 'errors.user.login' }));
            }),
          );
        }),
      );
    });

    this.logoutUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.logoutUser),
        switchMap(() => {
          this.storageService.remove('token');
          this.router.navigate(['welcome']);
          return of(UserActions.logoutSuccess());
        }),
      );
    });

    this.signupUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.signupUser),
        switchMap(({ userReq }: { userReq: UserSignupReq }) => {
          return this.authService.signup(userReq).pipe(
            map(() => {
              return UserActions.loginUser({ userReq });
            }),
            catchError(() => {
              return of(NotificationActions.showFailToast({ message: 'errors.user.signup' }));
            }),
          );
        }),
      );
    });

    this.updateUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.updateUser),
        switchMap(({ userReq }: { userReq: UserSignupReq }) => {
          const token = this.tokenService.getDataByToken();
          let id = '';
          if (token) {
            id = token.id;
          }
          return this.userService.update(userReq, id).pipe(
            map((userResp: UserResp) => {
              return UserActions.updateUserSuccess({ userResp });
            }),
            catchError(() => {
              return of(NotificationActions.showFailToast({ message: 'errors.user.update' }));
            }),
          );
        }),
      );
    });

    this.deleteUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.deleteUser),
        switchMap(() => {
          const id = this.tokenService.getDataByToken()?.id as string;
          return this.userService.remove(id).pipe(
            map(() => {
              this.storageService.remove('token');
              this.router.navigate(['welcome']);
              return UserActions.deleteUserSuccess();
            }),
            catchError(() => {
              return of(NotificationActions.showFailToast({ message: 'errors.user.remove' }));
            }),
          );
        }),
      );
    });

    this.loadUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.loadUser),
        switchMap(() => of(this.tokenService.getDataByToken()?.id as string)),
        filter((id) => !!id),
        switchMap((id) => {
          return this.userService.loadUser(id).pipe(
            map((userResp: UserResp) => {
              this.router.navigate(['main']);
              return UserActions.loadUserSuccess({ userResp });
            }),
            catchError(() => {
              return of(NotificationActions.showFailToast({ message: 'errors.user.loadUser' }));
            }),
          );
        }),
      );
    });
  }
}
