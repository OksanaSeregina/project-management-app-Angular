import { createReducer, on } from '@ngrx/store';
import flattenDeep from 'lodash/flattenDeep';
import values from 'lodash/values';
import { TaskResp } from '../../models';
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
    if (key in state) {
      return {
        ...state,
        [key]: [...state[key], taskResp],
      };
    }
    return {
      ...state,
      [key]: [taskResp],
    };
  }),
  on(TasksActions.updateTaskSuccess, (state, { taskResp }): TasksState => {
    const key = taskResp.columnId;
    let newState: TasksState;

    // NOTE: updates tasks from the same column
    const index = state[key]?.findIndex(({ _id }) => _id === taskResp._id);
    if (index > -1) {
      newState = { ...state, [key]: [...state[key].slice(0, index), taskResp, ...state[key].slice(index + 1)] };
      // NOTE: updates tasks from different columns
    } else {
      const oldColumnKey: string = (<TaskResp>flattenDeep(values(state)).find((task) => task._id === taskResp._id)).columnId;
      const index = state[oldColumnKey].findIndex(({ _id }) => _id === taskResp._id);
      newState = {
        ...state,
        // NOTE: delete task from previous column
        [oldColumnKey]: [...state[oldColumnKey].slice(0, index), ...state[oldColumnKey].slice(index + 1)],
        // NOTE: add task to new column (component sorts value by order, so we can skip this step)
        [key]: state[key] ? [...state[key], taskResp] : [taskResp],
      };
    }
    return newState;
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
