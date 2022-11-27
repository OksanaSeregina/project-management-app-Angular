import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { INavigateButton, UserFacade, UserResp, UsersFacade } from '../../../../core';
import { ITaskDialog, ITaskDialogAction } from './models';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  public form: FormGroup;
  public buttons: INavigateButton[] = [
    {
      icon: '',
      value: this.translate.instant('components.task-dialog.save'),
      isVisibleForUser: true,
      route: 'save',
      disabled: true,
    },
    {
      icon: '',
      value: this.translate.instant('components.task-dialog.cancel'),
      isVisibleForUser: true,
      route: 'cancel',
    },
  ];

  public users$: Observable<(UserResp | undefined)[] | null>;
  private userId = '';
  private username = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ITaskDialog,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private translate: TranslateService,
    private usersFacade: UsersFacade,
    private userFacade: UserFacade,
  ) {}

  public ngOnInit(): void {
    let selectUser: string[];

    this.users$ = this.usersFacade.users$;

    this.subscription = this.userFacade.user$.subscribe((item) => {
      if (item) {
        this.userId = item._id as string;
        this.username = item.login as string;
      }
    });

    if (this.data.action === ITaskDialogAction.Create) {
      selectUser = [this.username];
    } else {
      selectUser = [this.data?.task?.users[0] as string];
    }

    this.form = new FormGroup({
      title: new FormControl(this.data?.task?.title || '', [Validators.required]),
      description: new FormControl(this.data?.task?.description || ''),
      users: new FormControl(selectUser[0]),
    });

    if (this.data.action === ITaskDialogAction.Create) {
      this.subscription.add(
        (<FormControl>this.form.get('title')).valueChanges.subscribe((value) => this.isEnableSaveButton(value)),
      );
    } else {
      this.subscription.add(this.form.valueChanges.subscribe((value: string) => this.isEnableSaveButton(value)));
    }
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public navigate(button: INavigateButton): void {
    const task = this.data?.task || {};
    switch (button.route) {
      case 'save':
        this.dialogRef.close({
          ...this.data,
          task: {
            ...task,
            title: this.form.get('title')?.value,
            description: this.form.get('description')?.value,
            users: this.form.get('users')?.value,
          },
        });
        break;
      case 'cancel':
        this.dialogRef.close();
        break;
    }
  }

  private isEnableSaveButton(value: string) {
    const disabled = !value;
    const [saveBtn, cancelBtn] = this.buttons;
    if (disabled !== saveBtn.disabled) {
      this.buttons = [{ ...saveBtn, disabled }, cancelBtn];
    }
  }
}
