import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { NotificationEffects } from './notification.effects';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([NotificationEffects])],
})
export class NotificationStoreModule {}
