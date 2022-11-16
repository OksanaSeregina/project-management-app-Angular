import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducers } from './user.reducers';
import { UserEffects } from './user.effects';
import { UserFacade } from './user.facade';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature('user', userReducers), EffectsModule.forFeature([UserEffects])],
  providers: [UserFacade],
})
export class UserStoreModule {}
