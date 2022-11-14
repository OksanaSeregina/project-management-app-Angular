import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/modules/user';
import { UserResp } from '../../models';

import { NotificationActions } from '../notification';
import * as UsersAction from './users.actions';

export const STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
};

@Injectable()
export class UsersEffects {
  constructor(private readonly actions$: Actions, private usersService: UserService) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersAction.LOAD_USERS),
      switchMap(() => {
        return this.usersService.loadAllUsers().pipe(
          /**
           * Check the feature
           */
          tap((userResp: UserResp[]) => console.log('All user: ', userResp)),

          map((usersResp: UserResp[]) => {
            return UsersAction.loadSuccess({ usersResp });
          }),

          catchError((err) => {
            const fail = err.message;
            NotificationActions.showFailToast({ message: fail });
            return of(UsersAction.loadFail({ fail }));
          }),
        );
      }),
    );
  });
}
