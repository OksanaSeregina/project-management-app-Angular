import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { WelcomeComponent } from './welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { InfoProjectComponent, CardTeamComponent, CourseComponent } from './components';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [WelcomeComponent, InfoProjectComponent, CardTeamComponent, CourseComponent],
  imports: [CommonModule, WelcomeRoutingModule, SharedModule, TranslateModule],
})
export class WelcomeModule {}
