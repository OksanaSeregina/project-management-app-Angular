import { createReducer, on } from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import { TasksState } from './tasks.state';

const initialTasks: TasksState = {};

export const tasksReducers = createReducer(
  initialTasks,

  on(TasksActions.loadTaskSuccess, (state, { taskResp }): TasksState => {
    const key = taskResp.columnId;
    return {
      ...state,
      [key]: [...state[key], taskResp],
    };
  }),

  on(TasksActions.loadTasksSuccess, (state, { tasksResp }): TasksState => {
    const key = tasksResp[0].columnId;
    return {
      ...state,
      [key]: [...state[key], ...tasksResp],
    };
  }),

  on(TasksActions.createTaskSuccess, (state, { taskResp }): TasksState => {
    const key = taskResp.columnId;
    return {
      ...state,
      [key]: [...state[key], taskResp],
    };
  }),

  on(TasksActions.updateTaskSuccess, (state, { taskResp }): TasksState => {
    const key = taskResp.columnId;
    const id = taskResp._id;
    const filterColumn = state[key].filter(({ _id }) => _id !== id);
    return {
      ...state,
      [key]: [...filterColumn, taskResp],
    };
  }),

  on(TasksActions.deleteTaskSuccess, (state, { taskResp }): TasksState => {
    const key = taskResp.columnId;
    const id = taskResp._id;
    const filterColumn = state[key].filter(({ _id }) => _id !== id);
    return {
      ...state,
      [key]: [...filterColumn],
    };
  }),

  on(TasksActions.searchTasksSuccess, (state, { tasksResp }): TasksState => {
    const key = 'search';
    return {
      ...state,
      [key]: [...tasksResp],
    };
  }),
);
