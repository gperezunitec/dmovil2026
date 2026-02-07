import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/rides/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'earnings',
    loadComponent: () => import('./pages/earnings/earnings/earnings.page').then( m => m.EarningsPage)
  },

];
