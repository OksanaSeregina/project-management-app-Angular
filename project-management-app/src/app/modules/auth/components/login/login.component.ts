import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthService,
  isLettersAndNumbersValidator,
  onlyLettersAndNumbersValidator,
  UserFacade,
  UserSigninReq,
} from '../../../../core';
import { MIN_LENGTH_LOGIN, MIN_LENGTH_PASSWORD } from '../../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(protected authService: AuthService, private userFacade: UserFacade) {}

  public loginForm: FormGroup;

  public ngOnInit(): void {
    this.createForm();
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const userReq: UserSigninReq = {
        login: username,
        password: password,
      };
      this.userFacade.loginUser(userReq);
    }
  }

  public hasFieldError(field: string, errorType: string): boolean {
    return this.loginForm.get(field)?.errors && this.loginForm.get(field)?.errors?.[errorType];
  }

  private createForm(): void {
    this.loginForm = new FormGroup({
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
    });
  }
}
