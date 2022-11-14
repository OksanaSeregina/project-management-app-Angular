import { Injectable } from '@angular/core';

import { DecodedToken } from '../models';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private storage: StorageService) {}

  public getDataByToken(): DecodedToken | null {
    const jwt = this.storage.get('token');
    if (jwt) {
      const token: DecodedToken = this.parseJwt(jwt);
      return token;
    }
    return null;
  }

  private parseJwt(token: string): DecodedToken {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
    return JSON.parse(jsonPayload);
  }
}
