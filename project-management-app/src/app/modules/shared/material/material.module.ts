import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    MatInputModule,
    MatToolbarModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    DragDropModule,
    MatButtonToggleModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  exports: [
    DragDropModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonToggleModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class MaterialModule {}
