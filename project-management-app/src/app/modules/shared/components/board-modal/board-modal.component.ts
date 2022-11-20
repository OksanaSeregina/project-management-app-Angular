import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IBoardModal, INavigateButton } from '../../../shared';

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BoardModalComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  form: FormGroup;
  buttons: INavigateButton[] = [
    {
      icon: '',
      value: this.translate.instant('board-modal.save'),
      isVisibleForUser: true,
      route: 'save',
      disabled: true,
    },
    {
      icon: '',
      value: this.translate.instant('board-modal.cancel'),
      isVisibleForUser: true,
      route: 'cancel',
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IBoardModal,
    private dialogRef: MatDialogRef<BoardModalComponent>,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.data?.board?.title || '', [Validators.required]),
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
    const board = this.data?.board || {};
    switch (button.route) {
      case 'save':
        this.dialogRef.close({
          ...this.data,
          board: {
            ...board,
            title: this.form.get('title')?.value,
          },
        });
        break;
      case 'cancel':
        this.dialogRef.close();
        break;
    }
  }
}
