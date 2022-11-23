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
    if (tasksResp.length) {
      const key = tasksResp[0].columnId;
      return {
        ...state,
        [key]: [...tasksResp],
      };
    }
    return { ...state };
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
    const index = state[key].findIndex(({ _id }) => _id === taskResp._id);
    const task = [...state[key].slice(0, index), taskResp, ...state[key].slice(index + 1)];
    return {
      ...state,
      [key]: [...task],
    };
  }),
  on(TasksActions.deleteTaskSuccess, (state, { taskResp }): TasksState => {
    const key = taskResp.columnId;
    const index = state[key].findIndex(({ _id }) => _id === taskResp._id);
    const task = [...state[key].slice(0, index), ...state[key].slice(index + 1)];
    return {
      ...state,
      [key]: [...task],
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
