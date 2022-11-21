import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HTTP_CONFIG, HTTP_OPTIONS } from '../../constants';
import { UserResp, UserSignupReq } from '../models';
import { UserState } from '../store';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private storage: StorageService, private store: Store<UserState>) {}

  public loadAllUsers(): Observable<UserResp[]> {
    const url = `${HTTP_CONFIG.baseUrl}${HTTP_CONFIG.users}`;
    return this.http.get<UserResp[]>(url, HTTP_OPTIONS);
  }

  public loadUser(id: string): Observable<UserResp> {
    const url = `${HTTP_CONFIG.baseUrl}${HTTP_CONFIG.users}/${id}`;
    return this.http.get<UserResp>(url, HTTP_OPTIONS);
  }

  public update(req: UserSignupReq, id: string): Observable<UserResp> {
    const url = `${HTTP_CONFIG.baseUrl}${HTTP_CONFIG.users}/${id}`;
    const body: string = JSON.stringify({
      name: req.name,
      login: req.login,
      password: req.password,
    });
    return this.http.put<UserResp>(url, body, HTTP_OPTIONS);
  }

  public remove(id: string): Observable<UserResp> {
    const url = `${HTTP_CONFIG.baseUrl}${HTTP_CONFIG.users}/${id}`;
    return this.http.delete<UserResp>(url, HTTP_OPTIONS);
  }
}
