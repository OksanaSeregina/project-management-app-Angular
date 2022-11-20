import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ColumnEffects } from './column.effects';
import { ColumnFacade } from './column.facade';
import { columnReducers } from './column.reducers';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('columns', columnReducers), EffectsModule.forFeature([ColumnEffects])],
  providers: [ColumnFacade],
})
export class ColumnStoreModule {}
