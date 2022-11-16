import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as UsersActions from './users.actions';

@Injectable()
export class UsersFacade {
  private store: Store<AppState>;
  constructor(store: Store<AppState>) {
    this.store = store;
  }

  public load(): void {
    this.store.dispatch(UsersActions.load());
  }
}
