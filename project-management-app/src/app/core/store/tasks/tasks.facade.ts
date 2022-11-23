import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IColumn, TaskResp, TaskSetReq } from '../../models';
import { AppState } from '../app.state';
import * as TasksActions from './tasks.actions';
import { selectTasks, selectTasksByColumn } from './tasks.selectors';
import { TasksState } from './tasks.state';

@Injectable()
export class TasksFacade {
  private store: Store<AppState>;

  public tasks$: Observable<TasksState>;

  constructor(store: Store<AppState>) {
    this.store = store;
    this.tasks$ = this.store.pipe(select(selectTasks));
  }

  public loadTask(boardId: string, columnId: string, taskId: string): void {
    this.store.dispatch(TasksActions.loadTask({ boardId, columnId, taskId }));
  }

  public loadTasks(boardId: string, columns: IColumn[]): void {
    this.store.dispatch(TasksActions.loadTasks({ boardId, columns }));
  }

  public createTask(taskReq: TaskResp): void {
    this.store.dispatch(TasksActions.createTask({ taskReq }));
  }

  public updateTask(taskReq: TaskResp): void {
    this.store.dispatch(TasksActions.updateTask({ taskReq }));
  }

  public deleteTask(boardId: string, columnId: string, taskId: string): void {
    this.store.dispatch(TasksActions.deleteTask({ boardId, columnId, taskId }));
  }

  public searchTasks(ids: string[], userId: string, search: string): void {
    this.store.dispatch(TasksActions.searchTasks({ ids, userId, search }));
  }

  public getTasksByColumn(columnId: string): Observable<TaskResp[]> {
    return this.store.select(selectTasksByColumn(columnId));
  }

  public updateTasksSet(boardId: string, columns: IColumn[], tasks: TaskSetReq[]): void {
    this.store.dispatch(TasksActions.updateTasksSet({ boardId, columns, tasks }));
  }
}
