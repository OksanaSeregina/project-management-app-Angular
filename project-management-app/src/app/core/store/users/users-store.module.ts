import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { usersReducers } from './users.reducers';
import { UsersEffects } from './users.effects';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature('users', usersReducers), EffectsModule.forFeature([UsersEffects])],
})
export class UsersStoreModule {}
