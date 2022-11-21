import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP_CONFIG } from '../../constants';
import { IBoard } from '../models';

const URL = `${HTTP_CONFIG.baseUrl}boards`;

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private http: HttpClient) {}

  public get(): Observable<IBoard[]> {
    return this.http.get<Array<IBoard>>(URL);
  }

  public create(board: IBoard): Observable<IBoard> {
    return this.http.post<IBoard>(URL, board);
  }

  public update({ _id, owner, title, users }: IBoard): Observable<IBoard> {
    return this.http.put<IBoard>(`${URL}/${_id}`, { owner, title, users });
  }

  public delete(id: string): Observable<IBoard> {
    return this.http.delete<IBoard>(`${URL}/${id}`);
  }
}
