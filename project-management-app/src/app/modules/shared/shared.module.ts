import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material';
import { ConfirmDeleteComponent, HeaderComponent, FooterComponent, NotFoundComponent } from './components';

@NgModule({
  declarations: [ConfirmDeleteComponent, NotFoundComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, MaterialModule, TranslateModule],
  exports: [HeaderComponent, FooterComponent, MaterialModule],
})
export class SharedModule {}
