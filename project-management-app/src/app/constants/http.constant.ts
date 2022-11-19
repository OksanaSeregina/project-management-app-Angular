import { HttpHeaders } from '@angular/common/http';

export const HTTP_CONFIG = {
  baseUrl: 'https://final-task-backend-production-b8d2.up.railway.app/',
  signup: 'auth/signup',
  signin: 'auth/signin',
  users: 'users',
  boards: 'boards',
  columns: 'columns',
  tasks: 'tasks',
  taskSet: 'taskSet',
  file: 'file',
  points: 'points',
  logsError: 'logs/error',
  logsInfo: 'logs/info',
};

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    accept: 'application/json',
    'Content-Type': 'application/json',
  }),
};
