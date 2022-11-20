import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { TaskResp } from '../../../modules/board/models/task.model';
import * as TasksActions from './tasks.actions';

@Injectable()
export class TasksFacade {
  private store: Store<AppState>;

  public tasks$: Observable<TaskResp>;

  constructor(store: Store<AppState>) {
    this.store = store;
  }

  public loadTask(boardId: string, columnId: string, taskId: string): void {
    this.store.dispatch(TasksActions.loadTask({ boardId, columnId, taskId }));
  }

  public loadTasks(boardId: string, columnId: string): void {
    this.store.dispatch(TasksActions.loadTasks({ boardId, columnId }));
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
}
