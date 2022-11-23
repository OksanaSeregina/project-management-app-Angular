import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.state';

const selectTasksState = createFeatureSelector<TasksState>('tasks');

export const selectTasks = createSelector(selectTasksState, (state: TasksState) => state);

export const selectTasksByColumn = (columnId: string) =>
  createSelector(selectTasksState, (state: TasksState) => state[columnId]);

export const selectTaskInColumn = (columnId: string, taskId: string) =>
  createSelector(selectTasksState, (state: TasksState) => state[columnId].find(({ _id }) => _id === taskId));
