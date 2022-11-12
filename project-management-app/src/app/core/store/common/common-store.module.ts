import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { commonReducers } from './common.reducers';
import { CommonEffects } from './common.effects';
import { CommonFacade } from './common.facade';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature('common', commonReducers), EffectsModule.forFeature([CommonEffects])],
  providers: [CommonFacade],
})
export class CommonStoreModule {}
