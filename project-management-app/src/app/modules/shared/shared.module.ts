import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  BoardModalComponent,
  ButtonMulticolorComponent,
  ConfirmationDialogComponent,
  FooterComponent,
  HeaderComponent,
  NotFoundComponent,
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
    BoardModalComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, TranslateModule, PipesModule, FormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    ConfirmationDialogComponent,
    MaterialModule,
    PipesModule,
    BoardModalComponent,
    ButtonMulticolorComponent,
  ],
})
export class SharedModule {}
