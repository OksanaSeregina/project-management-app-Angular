import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: ':id', component: MainComponent }, // TODO: Test only, replace with real component
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
