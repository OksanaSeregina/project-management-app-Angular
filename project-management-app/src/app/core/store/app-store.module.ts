import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../../environments/environment';
import { BoardStoreModule } from './board';
import { ColumnStoreModule } from './column';
import { CommonStoreModule } from './common';
import { NotificationStoreModule } from './notification/notification.module';
import { UserStoreModule } from './user';
import { UsersStoreModule } from './users';

@NgModule({
  imports: [
    CommonModule,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      },
    ),
    EffectsModule.forRoot([]),
    CommonStoreModule,
    BoardStoreModule,
    NotificationStoreModule,
    UserStoreModule,
    UsersStoreModule,
    ColumnStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
})
export class AppStoreModule {}
