import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../components';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private readonly snackBar: MatSnackBar, public dialog: MatDialog) {}

  public success(message: string): void {
    this.openSnackBar(message, '', 'success-snackbar', 2000);
  }

  public error(message: string): void {
    this.openSnackBar(message, '', 'error-snackbar', 2000);
  }

  public confirm(
    message: string,
    okCallback: () => void,
    title = 'Are you sure?',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    cancelCallback: () => void = () => {},
  ): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { message: message, title: title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && okCallback) {
        okCallback();
      }
      if (!result && cancelCallback) {
        cancelCallback();
      }
    });
  }

  private openSnackBar(message: string, action: string, className = '', duration = 1000): void {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: [className],
    });
  }
}
