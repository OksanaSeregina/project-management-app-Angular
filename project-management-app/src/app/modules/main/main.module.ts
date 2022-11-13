import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BoardStoreModule } from '../../core';
import { SharedModule } from '../shared';
import { SimpleListComponent } from './components';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent, SimpleListComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule, TranslateModule, BoardStoreModule],
})
export class MainModule {}
