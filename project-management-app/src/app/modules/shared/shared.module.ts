import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  DialogComponent,
  ButtonBackComponent,
  ButtonMulticolorComponent,
  FooterComponent,
  HeaderComponent,
  NotFoundComponent,
} from './components';
import { DirectivesModule } from './directives';
import { MaterialModule } from './material';
import { PipesModule } from './pipes';

@NgModule({
  declarations: [
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    ButtonBackComponent,
    ButtonMulticolorComponent,
    DialogComponent,
    ButtonBackComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, TranslateModule, PipesModule, FormsModule, DirectivesModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    MaterialModule,
    PipesModule,
    DialogComponent,
    ButtonBackComponent,
    ButtonMulticolorComponent,
    DirectivesModule,
  ],
})
export class SharedModule {}
