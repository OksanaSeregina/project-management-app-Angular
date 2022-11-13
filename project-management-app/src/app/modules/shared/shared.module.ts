import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  ButtonMulticolorComponent, ConfirmationDialogComponent, FooterComponent, HeaderComponent, NotFoundComponent,
} from './components';
import { MaterialModule } from './material';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    ButtonMulticolorComponent,
  ],
  imports: [CommonModule, MaterialModule, TranslateModule],
  exports: [HeaderComponent, FooterComponent, ConfirmationDialogComponent, MaterialModule],
})
export class SharedModule {}
