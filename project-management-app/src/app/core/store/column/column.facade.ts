import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IColumn } from '../../../modules/board';
import { AppState } from '../app.state';
import * as ColumnActions from './column.actions';
import { selectColumns } from './column.selectors';

/**
 * Column Facade service
 */
@Injectable()
export class ColumnFacade {
  private store: Store<AppState>;

  public columns$: Observable<IColumn[]>;

  constructor(store: Store<AppState>) {
    this.store = store;
    this.columns$ = this.store.pipe(select(selectColumns));
  }

  public loadColumns(boardId: string): void {
    this.store.dispatch(ColumnActions.loadColumns({ boardId }));
  }

  public createColumn(boardId: string, column: Pick<IColumn, 'title' | 'order'>): void {
    this.store.dispatch(ColumnActions.createColumn({ boardId, column }));
  }

  public updateColumn(boardId: string, column: Pick<IColumn, '_id' | 'title' | 'order'>): void {
    this.store.dispatch(ColumnActions.updateColumn({ boardId, column }));
  }

  public deleteColumn(boardId: string, columnId: string): void {
    this.store.dispatch(ColumnActions.deleteColumn({ boardId, columnId }));
  }
}
