import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BoardFacade } from '../../../../core';
import { IBoard } from '../../../../modules/board';

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.scss'],
})
export class BoardModalComponent {
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<BoardModalComponent>, private boardFacade: BoardFacade) {
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
    const board: Omit<IBoard, '_id'> = {
      title: this.form.value.title,
      owner: '',
      users: [],
    };
    this.boardFacade.createBoard(board);
  }
}
