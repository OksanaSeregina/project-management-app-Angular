import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material';
import { ConfirmDeleteComponent, HeaderComponent, FooterComponent, NotFoundComponent } from './components';
import { ButtonMulticolorComponent } from './components/button-multicolor/button-multicolor.component';

@NgModule({
  declarations: [ConfirmDeleteComponent, NotFoundComponent, HeaderComponent, FooterComponent, ButtonMulticolorComponent],
  imports: [CommonModule, MaterialModule, TranslateModule],
  exports: [HeaderComponent, FooterComponent, MaterialModule],
})
export class SharedModule {}
