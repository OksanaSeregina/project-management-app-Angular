import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { InfoProjectComponent, CardTeamComponent } from './components';
import { SharedModule } from '../shared';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [WelcomeComponent, InfoProjectComponent, CardTeamComponent],
  imports: [CommonModule, WelcomeRoutingModule, SharedModule, TranslateModule],
})
export class WelcomeModule {}
