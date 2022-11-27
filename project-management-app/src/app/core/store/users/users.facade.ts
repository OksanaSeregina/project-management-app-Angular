import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserResp } from '../../models';
import { AppState } from '../app.state';
import * as UsersActions from './users.actions';
import { selectAllUsers, selectUserById, selectUsersByIds } from './users.selectors';

@Injectable()
export class UsersFacade {
  private store: Store<AppState>;
  public users$: Observable<UserResp[]>;

  constructor(store: Store<AppState>) {
    this.store = store;
    this.users$ = this.store.select(selectAllUsers);
  }

  public load(): void {
    this.store.dispatch(UsersActions.load());
  }

  public getUserById(id: string): Observable<(UserResp | undefined) | null> {
    return this.store.select(selectUserById(id));
  }

  public getUsersByIds(ids: string[]): Observable<(UserResp | undefined)[] | null> {
    return this.store.select(selectUsersByIds(ids));
  }
}
