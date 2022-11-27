import { HttpHeaders } from '@angular/common/http';

export const HTTP_CONFIG = {
  baseUrl: 'https://final-task-backend-production-8c3c.up.railway.app/',
  signup: 'auth/signup',
  signin: 'auth/signin',
  users: 'users',
  boards: 'boards',
  columns: 'columns',
  tasks: 'tasks',
  tasksSet: 'tasksSet',
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
