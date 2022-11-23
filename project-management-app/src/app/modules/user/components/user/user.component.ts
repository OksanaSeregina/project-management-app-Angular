import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import {
  confirmedPassValidator,
  isLettersAndNumbersValidator,
  NotificationService,
  onlyLettersAndNumbersValidator,
  onlyLettersValidator,
  TokenService,
  UserData,
  UserFacade,
} from '../../../../core';

export const MIN_LENGTH_LOGIN = 2;
export const MIN_LENGTH_PASSWORD = 4;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public userForm: FormGroup;

  constructor(
    private tokenService: TokenService,
    private translate: TranslateService,
    private userFacade: UserFacade,
    private notificationService: NotificationService,
  ) {}

  public ngOnInit(): void {
    this.userFacade.user$.pipe(take(1)).subscribe((user) => this.createForm(<UserData>user));
  }

  public onSubmit(): void {
    if (this.userForm.valid) {
      const { name, username, password } = this.userForm.value;
      const userReq = {
        name: name,
        login: username,
        password: password,
      };
      this.userFacade.updateUser({ userReq });
    }
  }

  public deleteUser(): void {
    const userId = this.tokenService.getDataByToken()?.id as string;
    const message = this.translate.instant('components.confirmation-user.message');
    const okCallback = (): void => this.userFacade.deleteUser({ userId });
    const title = this.translate.instant('components.confirmation-user.title');
    this.notificationService.confirm(message, okCallback, title);
  }

  public hasFieldError(field: string, errorType: string): boolean {
    return this.userForm.get(field)?.errors && this.userForm.get(field)?.errors?.[errorType];
  }

  private createForm(user: UserData): void {
    this.userForm = new FormGroup(
      {
        name: new FormControl(user?.name, [
          Validators.required,
          Validators.minLength(MIN_LENGTH_LOGIN),
          onlyLettersValidator,
        ]),
        username: new FormControl(user?.login, [
          Validators.required,
          Validators.minLength(MIN_LENGTH_LOGIN),
          onlyLettersAndNumbersValidator,
        ]),
        password: new FormControl(user?.password, [
          Validators.required,
          Validators.minLength(MIN_LENGTH_PASSWORD),
          isLettersAndNumbersValidator,
        ]),
        repass: new FormControl(user?.password, [
          Validators.required,
          Validators.minLength(MIN_LENGTH_PASSWORD),
          isLettersAndNumbersValidator,
        ]),
      },
      { validators: confirmedPassValidator },
    );
  }
}
