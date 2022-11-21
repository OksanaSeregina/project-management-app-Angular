import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserResp } from '../../models';
import { UserService } from '../../services';
import { NotificationActions } from '../notification';
import * as UsersAction from './users.actions';

@Injectable()
export class UsersEffects {
  constructor(private readonly actions$: Actions, private usersService: UserService) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersAction.LOAD_USERS),
      switchMap(() => {
        return this.usersService.loadAllUsers().pipe(
          map((usersResp: UserResp[]) => {
            return UsersAction.loadSuccess({ usersResp });
          }),
          catchError(() => {
            return of(NotificationActions.showFailToast({ message: 'errors.user.loadAllUsers' }));
          }),
        );
      }),
    );
  });
}
