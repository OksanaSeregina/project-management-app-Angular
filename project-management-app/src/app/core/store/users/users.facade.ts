import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserResp } from '../../models';
import { AppState } from '../app.state';
import * as UsersActions from './users.actions';
import { selectUsersByIds } from './users.selectors';

@Injectable()
export class UsersFacade {
  private store: Store<AppState>;
  constructor(store: Store<AppState>) {
    this.store = store;
  }

  public load(): void {
    this.store.dispatch(UsersActions.load());
  }

  public getUsersByIds(ids: string[]): Observable<(UserResp | undefined)[] | null> {
    return this.store.select(selectUsersByIds(ids));
  }
}
