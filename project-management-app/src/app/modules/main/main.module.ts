import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BoardStoreModule } from '../../core';
import { SharedModule } from '../shared';
import { SimpleListComponent, SearchFormComponent, SortFormComponent, ToggleFormComponent } from './components';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent, SimpleListComponent, SearchFormComponent, SortFormComponent, ToggleFormComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule, TranslateModule, BoardStoreModule, FormsModule],
})
export class MainModule {}
