import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { MainHeaderComponent } from './main-component/main-header/main-header.component';
import { MainBordersComponent } from './main-component/main-borders/main-borders.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { AddBordersComponent } from './main-component/main-borders/add-borders/add-borders.component';
import { MainSpaceComponent } from './main-component/main-space/main-space.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [
    MainHeaderComponent,
    MainSpaceComponent,
    MainBordersComponent,
    MainComponentComponent,
    AddBordersComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MainRoutingModule,
  ],
  exports: [MainComponentComponent, MainSpaceComponent, MainBordersComponent],
})
export class MainModule {}
