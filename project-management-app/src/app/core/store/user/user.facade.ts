import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { selectUser } from './user.selectors';
import * as UserActions from './user.actions';
import { UserData, UserSignupReq } from '../../models';

@Injectable()
export class UserFacade {
  private store: Store<AppState>;

  public user$: Observable<UserData | null>;

  constructor(store: Store<AppState>) {
    this.store = store;
    this.user$ = this.store.pipe(select(selectUser));
  }

  public load(): void {
    this.store.dispatch(UserActions.load());
  }

  public update({ userReq }: { userReq: UserSignupReq }): void {
    this.store.dispatch(UserActions.update({ userReq }));
  }

  public remove({ userId }: { userId: string }): void {
    this.store.dispatch(UserActions.remove({ userId }));
  }

  public logout(): void {
    this.store.dispatch(UserActions.logout());
  }
}
