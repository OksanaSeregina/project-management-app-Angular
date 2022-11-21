import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared';
import { UserComponent } from './components';
import { UserPageComponent } from './pages';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserComponent, UserPageComponent],
  imports: [CommonModule, TranslateModule, FormsModule, SharedModule, ReactiveFormsModule, UserRoutingModule],
})
export class UserModule {}
