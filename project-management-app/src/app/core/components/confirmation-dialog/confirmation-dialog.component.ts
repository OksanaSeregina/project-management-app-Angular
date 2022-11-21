import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { INavigateButton } from '../../models';
import { IConfirmationDialog } from './confirmation-dialog.model';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  buttons: INavigateButton[] = [
    {
      icon: '',
      value: this.translate.instant('components.confirmation-board.submit'),
      isVisibleForUser: true,
      route: 'submit',
    },
    {
      icon: '',
      value: this.translate.instant('components.confirmation-board.cancel'),
      isVisibleForUser: true,
      route: 'cancel',
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmationDialog,
    private translate: TranslateService,
  ) {}

  navigate(button: INavigateButton): void {
    switch (button.route) {
      case 'submit':
        this.dialogRef.close(true);
        break;
      case 'cancel':
        this.dialogRef.close(false);
        break;
    }
  }
}
