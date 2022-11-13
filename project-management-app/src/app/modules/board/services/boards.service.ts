import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IBoard } from '../models';

// TODO: Implement auth interceptor
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    accept: 'application/json',
    'Content-Type': 'application/json',
    // TODO: Test only
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjODAzOWE3YS02Y2NiLTQ0MjgtOWZhYy1kZGJkNzdiOWY0MjYiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NjgzMDk4NTF9.sZ-JHIdtwHcmCpn4smtrdhYgki-SqcSpozG40NePmY8`,
  }),
};

const HTTP_OPTIONS_AUTH = {
  headers: new HttpHeaders({
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjODAzOWE3YS02Y2NiLTQ0MjgtOWZhYy1kZGJkNzdiOWY0MjYiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NjgzMDk4NTF9.sZ-JHIdtwHcmCpn4smtrdhYgki-SqcSpozG40NePmY8`,
  }),
};

export const BASE_URL = 'https://ancient-dawn-26808.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private http: HttpClient) {}

  public get(): Observable<IBoard[]> {
    return this.http.get<Array<IBoard>>(`${BASE_URL}/boards`, HTTP_OPTIONS);
  }

  public create(board: IBoard): Observable<IBoard> {
    return this.http.post<IBoard>(`${BASE_URL}/boards`, board, HTTP_OPTIONS);
  }

  public update({ id, title, description }: IBoard): Observable<IBoard> {
    return this.http.put<IBoard>(`${BASE_URL}/boards/${id}`, { title, description }, HTTP_OPTIONS);
  }

  public delete(id: string): Observable<string> {
    return this.http.delete<IBoard>(`${BASE_URL}/boards/${id}`, HTTP_OPTIONS_AUTH).pipe(
      switchMap(() => of(id)), //NOTE: Manually return id, as delete response doesn't contain value
    );
  }
}
