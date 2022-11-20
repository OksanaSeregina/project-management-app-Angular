import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { tasksReducers } from './tasks.reducers';
import { TasksEffects } from './tasks.effects';
import { TasksFacade } from './tasks.facade';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('tasks', tasksReducers), EffectsModule.forFeature([TasksEffects])],
  providers: [TasksFacade],
})
export class TasksStoreModule {}
