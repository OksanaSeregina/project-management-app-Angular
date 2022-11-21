import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP_CONFIG } from '../../constants';
import { IColumn } from '../models';

const URL = `${HTTP_CONFIG.baseUrl}boards`;

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  constructor(private http: HttpClient) {}

  public get(boardId: string): Observable<IColumn[]> {
    return this.http.get<Array<IColumn>>(`${URL}/${boardId}/columns`);
  }

  public create(boardId: string, column: Pick<IColumn, 'title' | 'order'>): Observable<IColumn> {
    return this.http.post<IColumn>(`${URL}/${boardId}/columns`, column);
  }

  public update(boardId: string, column: Pick<IColumn, '_id' | 'title' | 'order'>): Observable<IColumn> {
    return this.http.put<IColumn>(`${URL}/${boardId}/columns/${column._id}`, {
      title: column.title,
      order: column.order,
    });
  }

  public delete(boardId: string, columnId: string): Observable<IColumn> {
    return this.http.delete<IColumn>(`${URL}/${boardId}/columns/${columnId}`);
  }
}
