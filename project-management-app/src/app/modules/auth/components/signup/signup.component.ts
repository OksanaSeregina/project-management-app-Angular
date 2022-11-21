import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  confirmedPassValidator, isLettersAndNumbersValidator, onlyLettersAndNumbersValidator, onlyLettersValidator, UserFacade
} from '../../../../core';
import { MIN_LENGTH_LOGIN, MIN_LENGTH_PASSWORD } from '../../constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;

  constructor(private userFacade: UserFacade) {}

  public ngOnInit(): void {
    this.createForm();
  }

  public onSubmit(): void {
    if (this.signupForm.valid) {
      const { name, username, password } = this.signupForm.value;
      const userReq = {
        name: name,
        login: username,
        password: password,
      };
      this.userFacade.signupUser(userReq);
    }
  }

  public hasFieldError(field: string, errorType: string): boolean {
    return this.signupForm.get(field)?.errors && this.signupForm.get(field)?.errors?.[errorType];
  }

  private createForm(): void {
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
}
