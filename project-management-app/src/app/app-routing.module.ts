import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './modules/shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'welcome',
    loadChildren: () => import('./modules/welcome/welcome.module').then((module) => module.WelcomeModule),
  },
  {
    path: 'main',
    loadChildren: () => import('./modules/main/main.module').then((module) => module.MainModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'board',
    loadChildren: () => import('./modules/board/board.module').then((module) => module.BoardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then((module) => module.UserModule),
    canActivate: [AuthGuard],
  },
  { path: 'page-not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
