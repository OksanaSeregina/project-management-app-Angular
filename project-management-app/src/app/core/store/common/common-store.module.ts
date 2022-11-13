import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonEffects } from './common.effects';
import { CommonFacade } from './common.facade';
import { commonReducers } from './common.reducers';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('common', commonReducers), EffectsModule.forFeature([CommonEffects])],
  providers: [CommonFacade],
})
export class CommonStoreModule {}
