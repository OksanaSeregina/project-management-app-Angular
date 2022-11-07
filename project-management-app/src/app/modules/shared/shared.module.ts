import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [ConfirmDeleteComponent, NotFoundComponent],
  imports: [CommonModule],
})
export class SharedModule {}
