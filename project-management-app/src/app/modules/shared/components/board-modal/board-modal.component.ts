import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BoardActions } from '../../../../core';
import { IBoard } from '../../../../modules/board';

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.scss'],
})
export class BoardModalComponent {
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<BoardModalComponent>, private store: Store) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
    const board: IBoard = {
      title: this.form.value.title,
      description: this.form.value.description,
    };
    this.store.dispatch(BoardActions.createBoard({ board }));
  }
}
