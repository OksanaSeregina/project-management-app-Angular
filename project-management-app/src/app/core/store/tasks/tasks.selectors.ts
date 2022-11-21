import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.state';

const selectFeature = createFeatureSelector<TasksState>('tasks');

export const selectTasksByColumn = (columnId: string) =>
  createSelector(selectFeature, (state: TasksState) => state[columnId]);

export const selectTaskInColumn = (columnId: string, taskId: string) =>
  createSelector(selectFeature, (state: TasksState) => state[columnId].find(({ _id }) => _id === taskId));
