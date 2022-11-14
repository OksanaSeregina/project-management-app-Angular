import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  confirmedPassValidator,
  isLettersAndNumbersValidator,
  onlyLettersAndNumbersValidator,
  onlyLettersValidator,
  UserAction,
  UsersAction,
  UserState,
} from 'src/app/core';
import { TokenService } from 'src/app/core/services/token.service';

export const MIN_LENGTH_LOGIN = 2;
export const MIN_LENGTH_PASSWORD = 4;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public userForm!: FormGroup;

  constructor(private store: Store<UserState>, private tokenService: TokenService) {}

  ngOnInit() {
    this.userForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required, Validators.minLength(MIN_LENGTH_LOGIN), onlyLettersValidator]),
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(MIN_LENGTH_LOGIN),
          onlyLettersAndNumbersValidator,
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(MIN_LENGTH_PASSWORD),
          isLettersAndNumbersValidator,
        ]),
        repass: new FormControl('', [
          Validators.required,
          Validators.minLength(MIN_LENGTH_PASSWORD),
          isLettersAndNumbersValidator,
        ]),
      },
      { validators: confirmedPassValidator },
    );
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const { name, username, password } = this.userForm.value;
      const userReq = {
        name: name,
        login: username,
        password: password,
      };
      this.store.dispatch(UserAction.update({ userReq }));

      this.userForm.reset();
    }
  }

  public removeUser(): void {
    const userId = this.tokenService.getDataByToken()?.id as string;
    this.store.dispatch(UserAction.remove({ userId }));
  }

  public getAllUser(): void {
    const userId = this.tokenService.getDataByToken()?.id as string;
    this.store.dispatch(UsersAction.load());
  }

  public getUser(): void {
    const userId = this.tokenService.getDataByToken()?.id as string;
    this.store.dispatch(UserAction.load({ userId }));
  }

  public hasFieldError(field: string, errorType: string): boolean {
    return this.userForm.get(field)?.errors && this.userForm.get(field)?.errors?.[errorType];
  }
}
