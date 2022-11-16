import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { selectUser } from './user.selectors';
import * as UserActions from './user.actions';
import { UserData } from '../../models';

@Injectable()
export class UserFacade {
  private store: Store<AppState>;

  public user$: Observable<UserData | null>;

  constructor(store: Store<AppState>) {
    this.store = store;
    this.user$ = this.store.pipe(select(selectUser));
  }

  public logout(): void {
    this.store.dispatch(UserActions.logout());
  }
}
