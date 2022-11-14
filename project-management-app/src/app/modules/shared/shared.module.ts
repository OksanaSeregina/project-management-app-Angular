import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  ButtonMulticolorComponent,
  ConfirmationDialogComponent,
  FooterComponent,
  HeaderComponent,
  NotFoundComponent,
  SpinnerModule,
} from './components';
import { MaterialModule } from './material';
import { PipesModule } from './pipes';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    ButtonMulticolorComponent,
  ],
  imports: [CommonModule, MaterialModule, TranslateModule, SpinnerModule.forRoot(), PipesModule],
  exports: [HeaderComponent, FooterComponent, ConfirmationDialogComponent, MaterialModule, SpinnerModule, PipesModule],
})
export class SharedModule {}
