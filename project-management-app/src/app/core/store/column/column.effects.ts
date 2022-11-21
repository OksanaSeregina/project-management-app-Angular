import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { IColumn } from '../../models';
import { ColumnsService } from '../../services';
import { NotificationActions } from '../notification';
import * as ColumnActions from './column.actions';

/**
 * Column effects
 */
@Injectable()
export class ColumnEffects {
  private actions$: Actions;

  public loadColumns$: Observable<Action>;
  public createColumn$: Observable<Action>;
  public updateColumn$: Observable<Action>;
  public deleteColumn$: Observable<Action>;

  constructor(actions$: Actions, private columnService: ColumnsService) {
    this.actions$ = actions$;
    this.loadColumns$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ColumnActions.loadColumns),
        switchMap(({ boardId }) => {
          return this.columnService
            .get(boardId)
            .pipe(switchMap((columns: IColumn[]) => of(ColumnActions.loadColumnsSuccess({ columns }))));
        }),
      ),
    );

    this.createColumn$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ColumnActions.createColumn),
        switchMap(({ boardId, column }) => {
          return this.columnService.create(boardId, column).pipe(
            switchMap((column: IColumn) => [
              ColumnActions.createColumnSuccess({ column }),
              NotificationActions.showSuccessToast({ message: 'column.add_column_success_message' }),
            ]),
            catchError(() => of(NotificationActions.showFailToast({ message: 'column.add_column_fail_message' }))),
          );
        }),
      ),
    );

    this.updateColumn$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ColumnActions.updateColumn),
        switchMap(({ boardId, column }) => {
          return this.columnService.update(boardId, column).pipe(
            switchMap((column: IColumn) => [
              ColumnActions.updateColumnSuccess({ column }),
              NotificationActions.showSuccessToast({ message: 'column.update_column_success_message' }),
            ]),
            catchError(() => of(NotificationActions.showFailToast({ message: 'column.update_column_fail_message' }))),
          );
        }),
      ),
    );

    this.deleteColumn$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ColumnActions.deleteColumn),
        switchMap(({ boardId, columnId }) => {
          return this.columnService.delete(boardId, columnId).pipe(
            switchMap((column) => [
              ColumnActions.deleteColumnSuccess({ id: column._id }),
              NotificationActions.showSuccessToast({ message: 'column.delete_column_success_message' }),
            ]),
            catchError(() => of(NotificationActions.showFailToast({ message: 'column.delete_column_fail_message' }))),
          );
        }),
      ),
    );
  }
}
