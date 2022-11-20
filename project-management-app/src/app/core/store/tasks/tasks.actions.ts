import { createAction, props } from '@ngrx/store';
import { TaskResp } from '../../../modules/board/models/task.model';

export const LOAD_TASK = '[Tasks] Load Task';
export const LOAD_TASK_SUCCESS = '[Tasks] Load Task Success';
export const LOAD_TASKS = '[Tasks] Load Tasks';
export const LOAD_TASKS_SUCCESS = '[Tasks] Load Tasks Success';
export const CREATE_TASK = '[Tasks] Create Task';
export const CREATE_TASK_SUCCESS = '[Tasks] Create Task Success';
export const UPDATE_TASK = '[Tasks] Update Task';
export const UPDATE_TASK_SUCCESS = '[Tasks] Update Task Success';
export const DELETE_TASK = '[Tasks] Delete Task';
export const DELETE_TASK_SUCCESS = '[Tasks] Delete Task Success';
export const SEARCH_TASKS = '[Tasks] Search Tasks';
export const SEARCH_TASKS_SUCCESS = '[Tasks] Search Tasks Success';

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
