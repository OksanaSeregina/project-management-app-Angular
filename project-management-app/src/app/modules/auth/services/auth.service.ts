import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { HTTP_CONFIG, HTTP_OPTIONS } from '../../../constants/http.constant';
import { StorageService, UserResp, UserSigninReq, UserSignupReq, UserState, UserToken } from 'src/app/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<UserState>,
    private storage: StorageService,
  ) {}

  public signup(req: UserSignupReq): Observable<UserResp> {
    const url = `${HTTP_CONFIG.baseUrl}${HTTP_CONFIG.signup}`;
    const body: string = JSON.stringify({
      name: req.name,
      login: req.login,
      password: req.password,
    });
    return this.http.post<UserResp>(url, body, HTTP_OPTIONS);
  }

  public signin(req: UserSigninReq): Observable<UserToken> {
    const url = `${HTTP_CONFIG.baseUrl}${HTTP_CONFIG.signin}`;
    const body: string = JSON.stringify({
      login: req.login,
      password: req.password,
    });

    return this.http.post<UserToken>(url, body, HTTP_OPTIONS);
  }

  public setTokenToStorage(token: string): void {
    this.storage.set('token', token);
  }

  public removeFromStorage(): void {
    this.storage.remove('token');
  }
}
