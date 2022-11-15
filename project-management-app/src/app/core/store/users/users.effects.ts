import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { UserService } from '../../../modules/user/services/user.service';
import { UserResp } from '../../models';
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
          /**
           * Check the feature
           */
          tap((userResp: UserResp[]) => console.log('All user: ', userResp)),
          map((usersResp: UserResp[]) => {
            return UsersAction.loadSuccess({ usersResp });
          }),
          catchError((err) => {
            const fail = err.message;
            return of(
              NotificationActions.showFailToast({ message: 'board.delete_board_fail_message' }),
              UsersAction.loadFail({ fail }),
            );
          }),
        );
      }),
    );
  });
}
