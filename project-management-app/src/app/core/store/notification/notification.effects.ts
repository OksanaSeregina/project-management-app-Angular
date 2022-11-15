import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from '../../services';
import * as NotificationActions from './notification.actions';

/**
 * Notification effects
 */
@Injectable()
export class NotificationEffects {
  private actions$: Actions;

  public showSuccessToast$: Observable<void>;
  public showFailToast$: Observable<void>;

  constructor(
    actions$: Actions,
    private notificationService: NotificationService,
    private translateService: TranslateService,
  ) {
    this.actions$ = actions$;

    this.showSuccessToast$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(NotificationActions.showSuccessToast),
          map(({ message }) => {
            this.notificationService.success(this.translateService.instant(message));
          }),
        ),
      { dispatch: false },
    );

    this.showFailToast$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(NotificationActions.showFailToast),
          map(({ message }) => {
            this.notificationService.error(this.translateService.instant(message));
          }),
        ),
      { dispatch: false },
    );
  }
}
