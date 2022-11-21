import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP_CONFIG, HTTP_OPTIONS } from '../../constants';
import { TaskResp, TaskSetReq } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  public getTasksInColumn(boardId: string, columnId: string): Observable<TaskResp[]> {
    const url = `${HTTP_CONFIG.baseUrl}${HTTP_CONFIG.boards}/${boardId}/${HTTP_CONFIG.columns}/${columnId}/${HTTP_CONFIG.tasks}`;
    return this.http.get<TaskResp[]>(url, HTTP_OPTIONS);
  }

  public create(req: TaskResp): Observable<TaskResp> {
    const url = `${HTTP_CONFIG.baseUrl}${HTTP_CONFIG.boards}/${req.boardId}/${HTTP_CONFIG.columns}/${req.columnId}/${HTTP_CONFIG.tasks}`;
    const body: string = JSON.stringify({
      title: req.title,
      order: 0,
      description: req.description,
      userId: 0,
      users: req.users.slice(),
    });
    return this.http.post<TaskResp>(url, body, HTTP_OPTIONS);
  }

  public getTaskById(boardId: string, columnId: string, taskId: string): Observable<TaskResp> {
    const url = `${HTTP_CONFIG.baseUrl}${HTTP_CONFIG.boards}/${boardId}/${HTTP_CONFIG.columns}/${columnId}/${HTTP_CONFIG.tasks}/${taskId}`;
    return this.http.get<TaskResp>(url, HTTP_OPTIONS);
  }

  public update(req: TaskResp): Observable<TaskResp> {
    const url = `${HTTP_CONFIG.baseUrl}${HTTP_CONFIG.boards}/${req.boardId}/${HTTP_CONFIG.columns}/${req.columnId}/${HTTP_CONFIG.tasks}/${req._id}`;
    const body: string = JSON.stringify({
      title: req.title,
      order: 0,
      description: req.description,
      columnId: req.columnId,
      userId: 0,
      users: req.users.slice(),
    });
    return this.http.put<TaskResp>(url, body, HTTP_OPTIONS);
  }

  public delete(boardId: string, columnId: string, taskId: string): Observable<TaskResp> {
    const url = `${HTTP_CONFIG.baseUrl}${HTTP_CONFIG.boards}/${boardId}/${HTTP_CONFIG.columns}/${columnId}/${HTTP_CONFIG.tasks}/${taskId}`;
    return this.http.delete<TaskResp>(url, HTTP_OPTIONS);
  }

  public getTasksByList(listIds: string[], userId: string, search = ''): Observable<TaskResp[]> {
    const url = `${HTTP_CONFIG.baseUrl}${HTTP_CONFIG.taskSet}`;
    const ids: string = JSON.stringify(listIds);
    const params = new HttpParams().set('ids', ids).set('userId', userId).set('search', search);
    return this.http.get<TaskResp[]>(url, { headers: HTTP_OPTIONS.headers, params: params });
  }

  public updateTaskSet(req: TaskSetReq[]): Observable<TaskResp> {
    const url = `${HTTP_CONFIG.baseUrl}${HTTP_CONFIG.taskSet}`;
    const body: string = JSON.stringify(req);
    return this.http.patch<TaskResp>(url, body, HTTP_OPTIONS);
  }

  public getTasksInBoard(boardId: string): Observable<TaskResp[]> {
    const url = `${HTTP_CONFIG.baseUrl}${HTTP_CONFIG.taskSet}/${boardId}`;
    return this.http.get<TaskResp[]>(url, HTTP_OPTIONS);
  }
}
