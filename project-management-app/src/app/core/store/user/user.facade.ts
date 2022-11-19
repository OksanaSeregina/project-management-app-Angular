import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { selectUser } from './user.selectors';
import * as UserActions from './user.actions';
import { UserData, UserSigninReq, UserSignupReq } from '../../models';

@Injectable()
export class UserFacade {
  private store: Store<AppState>;

  public user$: Observable<UserData | null>;

  constructor(store: Store<AppState>) {
    this.store = store;
    this.user$ = this.store.pipe(select(selectUser));
  }

  public signupUser(userReq: UserSignupReq): void {
    this.store.dispatch(UserActions.signupUser({ userReq }));
  }

  public loginUser(userReq: UserSigninReq): void {
    this.store.dispatch(UserActions.loginUser({ userReq }));
  }

  public loadUser(): void {
    this.store.dispatch(UserActions.loadUser());
  }

  public updateUser({ userReq }: { userReq: UserSignupReq }): void {
    this.store.dispatch(UserActions.updateUser({ userReq }));
  }

  public deleteUser({ userId }: { userId: string }): void {
    this.store.dispatch(UserActions.deleteUser({ userId }));
  }

  public logoutUser(): void {
    this.store.dispatch(UserActions.logoutUser());
  }
}
