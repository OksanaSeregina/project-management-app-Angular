import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UserComponent } from './components/user/user.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [UserComponent, UserPageComponent],
  imports: [CommonModule, TranslateModule, FormsModule, SharedModule, ReactiveFormsModule, UserRoutingModule],
})
export class UserModule {}
