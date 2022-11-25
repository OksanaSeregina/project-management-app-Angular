import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { INavigateButton, UserResp, UsersFacade } from '../../../../core';
import { ITaskDialog } from './models';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskDialogComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  form: FormGroup;
  buttons: INavigateButton[] = [
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ITaskDialog,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private translate: TranslateService,
    private usersFacade: UsersFacade,
  ) {}

  ngOnInit(): void {
    if (this.data.task?.users) {
      this.users$ = this.usersFacade.getUsersByIds(this.data.task?.users);
    }

    this.form = new FormGroup({
      title: new FormControl(this.data?.task?.title || '', [Validators.required]),
      description: new FormControl(this.data?.task?.description || ''),
    });
    this.subscription = (<FormControl>this.form.get('title')).valueChanges.subscribe((value) => {
      const disabled = !value;
      const [saveBtn, cancelBtn] = this.buttons;
      if (disabled !== saveBtn.disabled) {
        this.buttons = [{ ...saveBtn, disabled }, cancelBtn];
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  navigate(button: INavigateButton): void {
    const task = this.data?.task || {};
    switch (button.route) {
      case 'save':
        this.dialogRef.close({
          ...this.data,
          task: {
            ...task,
            title: this.form.get('title')?.value,
            description: this.form.get('description')?.value,
          },
        });
        break;
      case 'cancel':
        this.dialogRef.close();
        break;
    }
  }
}
