import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './components/user/user.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserRoutingModule } from './user-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserComponent, UserPageComponent],
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, UserRoutingModule],
})
export class UserModule {}
