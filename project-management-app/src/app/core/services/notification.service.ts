import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../modules';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private readonly snackBar: MatSnackBar, public dialog: MatDialog) {}

  /**
   * Presents a toast displaying the message with a green background
   * @param message Message to display
   * @example
   * this.notificationService.success("confirm oked");
   */
  public success(message: string): void {
    this.openSnackBar(message, '', 'success-snackbar', 2000);
  }

  /**
   * Presents a toast displaying the message with a red background
   * @param message Message to display
   * @example
   * this.notificationService.error("confirm canceled");
   */
  public error(message: string): void {
    this.openSnackBar(message, '', 'error-snackbar', 2000);
  }

  /**
   * Shows a confirmation modal, presenting the user with
   * an OK and Cancel button.
   * @param message Body of the modal
   * @param okCallback Optional function to call when the user clicks Ok
   * @param title Optional modal title
   * @param cancelCallback Option function to call when the user clicks Cancel
   * @example
   * //displays a success or error message depending on what button is clicked.
   * this.notificationService.confirm(
   * 'it will be gone forever', //message body
   * () => { //okCallback
      this.notificationService.success("confirm oked");
    },
   'Are you sure?', //title
   () => { //cancelCallback
      this.notificationService.error("confirm canceled");
    });
   */
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

  /**
   * Displays a toast with provided message
   * @param message Message to display
   * @param action Action text, e.g. Close, Done, etc
   * @param className Optional extra css class to apply
   * @param duration Optional number of SECONDS to display the notification for
   */
  openSnackBar(message: string, action: string, className = '', duration = 1000): void {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: [className],
    });
  }
}
