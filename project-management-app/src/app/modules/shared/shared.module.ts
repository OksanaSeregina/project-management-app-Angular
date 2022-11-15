import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  BoardModalComponent, ButtonMulticolorComponent, ConfirmationDialogComponent, FooterComponent, HeaderComponent,
  NotFoundComponent, SpinnerModule,
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
  imports: [CommonModule, MaterialModule, TranslateModule, SpinnerModule.forRoot(), PipesModule, FormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    ConfirmationDialogComponent,
    MaterialModule,
    SpinnerModule,
    PipesModule,
    BoardModalComponent,
  ],
})
export class SharedModule {}
