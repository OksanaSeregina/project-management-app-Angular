import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isLettersAndNumbersValidator, onlyLettersAndNumbersValidator } from '../../../../core/validators';
import { MIN_LENGTH_LOGIN, MIN_LENGTH_PASSWORD } from '../../constants';
import { UserFacade, UserSigninReq } from '../../../../core';
import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(protected authService: AuthService, private userFacade: UserFacade) {}

  public loginForm: FormGroup;

  ngOnInit(): void {
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

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const userReq: UserSigninReq = {
        login: username,
        password: password,
      };
      this.userFacade.loginUser(userReq);
      this.loginForm.reset();
    }
  }

  public hasFieldError(field: string, errorType: string): boolean {
    return this.loginForm.get(field)?.errors && this.loginForm.get(field)?.errors?.[errorType];
  }
}
