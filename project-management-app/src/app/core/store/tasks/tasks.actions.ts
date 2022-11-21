import { createAction, props } from '@ngrx/store';
import { TaskResp } from '../../../modules/board';

const LOAD_TASK = '[Tasks] LOAD_TASK';
const LOAD_TASK_SUCCESS = '[Tasks] LOAD_TASK_SUCCESS';
const LOAD_TASKS = '[Tasks] LOAD_TASKS';
const LOAD_TASKS_SUCCESS = '[Tasks] LOAD_TASKS_SUCCESS';
const CREATE_TASK = '[Tasks] CREATE_TASK';
const CREATE_TASK_SUCCESS = '[Tasks] CREATE_TASK_SUCCESS';
const UPDATE_TASK = '[Tasks] UPDATE_TASK';
const UPDATE_TASK_SUCCESS = '[Tasks] UPDATE_TASK_SUCCESS';
const DELETE_TASK = '[Tasks] DELETE_TASK';
const DELETE_TASK_SUCCESS = '[Tasks] DELETE_TASK_SUCCESS';
const SEARCH_TASKS = '[Tasks] EARCH_TASKS';
const SEARCH_TASKS_SUCCESS = '[Tasks] SEARCH_TASKS_SUCCESS';

export const loadTask = createAction(LOAD_TASK, props<{ boardId: string; columnId: string; taskId: string }>());
export const loadTaskSuccess = createAction(LOAD_TASK_SUCCESS, props<{ taskResp: TaskResp }>());

export const loadTasks = createAction(LOAD_TASKS, props<{ boardId: string; columnId: string }>());
export const loadTasksSuccess = createAction(LOAD_TASKS_SUCCESS, props<{ tasksResp: TaskResp[] }>());

export const createTask = createAction(CREATE_TASK, props<{ taskReq: TaskResp }>());
export const createTaskSuccess = createAction(CREATE_TASK_SUCCESS, props<{ taskResp: TaskResp }>());

export const updateTask = createAction(UPDATE_TASK, props<{ taskReq: TaskResp }>());
export const updateTaskSuccess = createAction(UPDATE_TASK_SUCCESS, props<{ taskResp: TaskResp }>());

export const deleteTask = createAction(DELETE_TASK, props<{ boardId: string; columnId: string; taskId: string }>());
export const deleteTaskSuccess = createAction(DELETE_TASK_SUCCESS, props<{ taskResp: TaskResp }>());

export const searchTasks = createAction(SEARCH_TASKS, props<{ ids: string[]; userId: string; search: string }>());
export const searchTasksSuccess = createAction(SEARCH_TASKS_SUCCESS, props<{ tasksResp: TaskResp[] }>());
