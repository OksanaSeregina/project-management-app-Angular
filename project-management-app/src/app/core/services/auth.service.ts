import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { Observable } from 'rxjs';
import { HTTP_CONFIG, HTTP_OPTIONS } from '../../constants';
import { UserResp, UserSigninReq, UserSignupReq, UserToken } from '../models';
import { StorageService } from './storage.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService,
    private tokenService: TokenService,
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

  public isLoggedIn() {
    return this.getExpiration() && moment().isBefore(this.getExpiration());
  }

  private getExpiration() {
    const token = this.tokenService.getDataByToken();
    const expiresAt = token && token.exp * 1000;
    return expiresAt;
  }
}
