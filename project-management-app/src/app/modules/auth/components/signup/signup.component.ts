import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MIN_LENGTH_LOGIN, MIN_LENGTH_PASSWORD } from '../../constants/login.constant';
import {
  confirmedPassValidator,
  isLettersAndNumbersValidator,
  onlyLettersAndNumbersValidator,
  onlyLettersValidator,
  UserAction,
  UserState,
} from 'src/app/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;

  constructor(private store: Store<UserState>) {}

  ngOnInit() {
    this.signupForm = new FormGroup(
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
    if (this.signupForm.valid) {
      const { name, username, password } = this.signupForm.value;
      const userReq = {
        name: name,
        login: username,
        password: password,
      };
      this.store.dispatch(UserAction.signup({ userReq }));

      this.signupForm.reset();
    }
  }

  public hasFieldError(field: string, errorType: string): boolean {
    return this.signupForm.get(field)?.errors && this.signupForm.get(field)?.errors?.[errorType];
  }
}
