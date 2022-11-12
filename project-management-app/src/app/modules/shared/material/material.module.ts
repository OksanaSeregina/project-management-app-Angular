import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    DragDropModule,
    MatButtonToggleModule,
    MatListModule,
  ],
  exports: [DragDropModule, MatToolbarModule, MatIconModule, MatCardModule, MatButtonToggleModule, MatListModule],
})
export class MaterialModule {}
