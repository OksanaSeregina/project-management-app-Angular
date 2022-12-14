import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBoard } from '../../models';
import { AppState } from '../app.state';
import * as BoardActions from './board.actions';
import { selectBoards } from './board.selectors';

/**
 * Board Facade service
 */
@Injectable()
export class BoardFacade {
  private store: Store<AppState>;

  public boards$: Observable<IBoard[]>;

  constructor(store: Store<AppState>) {
    this.store = store;
    this.boards$ = this.store.pipe(select(selectBoards));
  }

  public loadBoards(): void {
    this.store.dispatch(BoardActions.loadBoards());
  }

  public loadBoardById(id: string): void {
    this.store.dispatch(BoardActions.loadBoardById({ id }));
  }

  public createBoard(board: Pick<IBoard, 'title'>): void {
    this.store.dispatch(BoardActions.createBoard({ board }));
  }

  public updateBoard(board: IBoard): void {
    this.store.dispatch(BoardActions.updateBoard({ board }));
  }

  public deleteBoard(id: string): void {
    this.store.dispatch(BoardActions.deleteBoard({ id }));
  }
}
