import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BoardEffects } from './board.effects';
import { BoardFacade } from './board.facade';
import { boardReducers } from './board.reducers';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('boards', boardReducers), EffectsModule.forFeature([BoardEffects])],
  providers: [BoardFacade],
})
export class BoardStoreModule {}
