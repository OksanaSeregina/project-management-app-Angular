import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { TaskResp } from '../../models';
import { TasksService } from '../../services';
import { NotificationActions } from '../notification';
import * as TasksActions from './tasks.actions';

@Injectable()
export class TasksEffects {
  public loadTask$: Observable<Action>;
  public loadTasks$: Observable<Action>;
  public createTask$: Observable<Action>;
  public updateTask$: Observable<Action>;
  public deleteTask$: Observable<Action>;
  public searchTasks$: Observable<Action>;
  public updateTasksSet$: Observable<Action>;

  constructor(private readonly actions$: Actions, private tasksService: TasksService) {
    this.loadTask$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(TasksActions.loadTask),
        switchMap(({ boardId, columnId, taskId }) => {
          return this.tasksService.getTaskById(boardId, columnId, taskId).pipe(
            map((taskResp: TaskResp) => {
              return TasksActions.loadTaskSuccess({ taskResp });
            }),
            catchError(() => {
              return of(NotificationActions.showFailToast({ message: 'errors.tasks.loadTask' }));
            }),
          );
        }),
      );
    });

    this.loadTasks$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(TasksActions.loadTasks),
        switchMap(({ boardId, columns }) => {
          return from(columns)
            .pipe(
              mergeMap((column) => this.tasksService.getTasksInColumn(boardId, column._id)),
              map((tasksResp: TaskResp[]) => TasksActions.loadTasksSuccess({ tasksResp })),
            )
            .pipe(
              catchError(() => {
                return of(NotificationActions.showFailToast({ message: 'errors.tasks.loadTasks' }));
              }),
            );
        }),
      );
    });

    this.createTask$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(TasksActions.createTask),
        switchMap(({ taskReq }) => {
          return this.tasksService.create(taskReq).pipe(
            map((taskResp: TaskResp) => {
              return TasksActions.createTaskSuccess({ taskResp });
            }),
            catchError(() => {
              return of(NotificationActions.showFailToast({ message: 'errors.tasks.create' }));
            }),
          );
        }),
      );
    });

    this.updateTask$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(TasksActions.updateTask),
        switchMap(({ taskReq }) => {
          return this.tasksService.update(taskReq).pipe(
            map((taskResp: TaskResp) => {
              return TasksActions.createTaskSuccess({ taskResp });
            }),
            catchError(() => {
              return of(NotificationActions.showFailToast({ message: 'errors.tasks.update' }));
            }),
          );
        }),
      );
    });

    this.deleteTask$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(TasksActions.deleteTask),
        switchMap(({ boardId, columnId, taskId }) => {
          return this.tasksService.delete(boardId, columnId, taskId).pipe(
            map((taskResp: TaskResp) => {
              return TasksActions.deleteTaskSuccess({ taskResp });
            }),
            catchError(() => {
              return of(NotificationActions.showFailToast({ message: 'errors.tasks.delete' }));
            }),
          );
        }),
      );
    });

    this.searchTasks$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(TasksActions.searchTasks),
        switchMap(({ ids, userId, search }) => {
          return this.tasksService.getTasksByList(ids, userId, search).pipe(
            map((tasksResp: TaskResp[]) => {
              return TasksActions.searchTasksSuccess({ tasksResp });
            }),
            catchError(() => {
              return of(NotificationActions.showFailToast({ message: 'errors.tasks.search' }));
            }),
          );
        }),
      );
    });

    this.updateTasksSet$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TasksActions.updateTasksSet),
        switchMap((payload) => {
          return this.tasksService.updateTasksSet(payload.tasks).pipe(
            switchMap((tasks: TaskResp[]) => {
              return from(tasks).pipe(mergeMap((taskResp) => of(TasksActions.updateTaskSuccess({ taskResp }))));
            }),
            catchError(() =>
              of(
                NotificationActions.showFailToast({ message: 'errors.tasks.update' }),
                TasksActions.loadTasks({ boardId: payload.boardId, columns: payload.columns }), // NOTE: We need to upload initial state as we already emulated changes from UI perspective
              ),
            ),
          );
        }),
      ),
    );

  }
}
