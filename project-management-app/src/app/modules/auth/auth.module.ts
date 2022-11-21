import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent, SignupComponent } from './components';
import { LoginPageComponent, SignupPageComponent } from './pages';

@NgModule({
  declarations: [LoginComponent, SignupComponent, LoginPageComponent, SignupPageComponent],
  imports: [CommonModule, TranslateModule, SharedModule, FormsModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
