import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BoardsService } from '../../../modules/board';
import * as BoardActions from './board.actions';

/**
 * Board effects
 */
@Injectable()
export class BoardEffects {
  private actions$: Actions;

  public loadBoards$: Observable<Action>;
  public createBoard$: Observable<Action>;
  public deleteBoard$: Observable<Action>;

  constructor(actions$: Actions, private boardService: BoardsService) {
    this.actions$ = actions$;

    this.loadBoards$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BoardActions.loadBoards),
        switchMap(() => {
          return this.boardService.get().pipe(switchMap((boards) => of(BoardActions.loadBoardsSuccess({ boards }))));
        }),
      ),
    );

    this.createBoard$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BoardActions.createBoard),
        switchMap((payload) => {
          return this.boardService
            .create(payload.board)
            .pipe(switchMap((board) => of(BoardActions.createBoardSuccess({ board }))));
        }),
      ),
    );

    this.deleteBoard$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BoardActions.deleteBoard),
        switchMap((payload) => {
          return this.boardService
            .delete(payload.id)
            .pipe(switchMap((id) => of(BoardActions.deleteBoardSuccess({ id }))));
        }),
      ),
    );
  }
}