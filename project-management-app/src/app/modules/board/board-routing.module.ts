import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColumnsComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: ':id', pathMatch: 'full' },
  { path: ':id', component: ColumnsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
