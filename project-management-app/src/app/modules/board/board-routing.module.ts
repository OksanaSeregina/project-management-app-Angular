import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColumnComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: ':id', component: ColumnComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
