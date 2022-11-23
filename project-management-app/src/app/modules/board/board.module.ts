import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared';
import { BoardRoutingModule } from './board-routing.module';
import { ColumnComponent, ColumnItemComponent } from './components';

@NgModule({
  declarations: [ColumnItemComponent, ColumnComponent],
  imports: [CommonModule, FormsModule, SharedModule, BoardRoutingModule, TranslateModule],
})
export class BoardModule {}
