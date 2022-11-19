import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { BoardsService, IBoard } from '../../../modules/board';
import { NotificationActions } from '../notification';
import { UserFacade } from '../user';
import * as BoardActions from './board.actions';

/**
 * Board effects
 */
@Injectable()
export class BoardEffects {
  public loadBoards$: Observable<Action>;
  public createBoard$: Observable<Action>;
  public updateBoard$: Observable<Action>;
  public deleteBoard$: Observable<Action>;

  constructor(private actions$: Actions, private boardService: BoardsService, private userFacade: UserFacade) {
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
          return this.userFacade.user$.pipe(
            map((user) => user?._id),
            filter((id) => !!payload && !!id),
            switchMap((_id) => {
              const board = { ...payload.board, owner: _id, users: [''] };
              return this.boardService.create(<IBoard>board).pipe(
                switchMap((board) => [
                  BoardActions.createBoardSuccess({ board }),
                  NotificationActions.showSuccessToast({ message: 'board.add_board_success_message' }),
                ]),
                catchError(() => of(NotificationActions.showFailToast({ message: 'board.add_board_fail_message' }))),
              );
            }),
          );
        }),
      ),
    );

    this.updateBoard$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BoardActions.updateBoard),
        switchMap((payload) => {
          return this.boardService.update(payload.board).pipe(
            switchMap((board) => [
              BoardActions.updateBoardSuccess({ board }),
              NotificationActions.showSuccessToast({ message: 'board.update_board_success_message' }),
            ]),
            catchError(() => of(NotificationActions.showFailToast({ message: 'board.update_board_fail_message' }))),
          );
        }),
      ),
    );

    this.deleteBoard$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BoardActions.deleteBoard),
        switchMap((payload) => {
          return this.boardService.delete(payload.id).pipe(
            switchMap((board) => [
              BoardActions.deleteBoardSuccess({ id: board._id }),
              NotificationActions.showSuccessToast({ message: 'board.delete_board_success_message' }),
            ]),
            catchError(() => of(NotificationActions.showFailToast({ message: 'board.delete_board_fail_message' }))),
          );
        }),
      ),
    );
  }
}
