import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components';
import { MaterialModule } from './material';

@NgModule({
  declarations: [ConfirmDeleteComponent, NotFoundComponent, HeaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [HeaderComponent],
})
export class SharedModule {}
