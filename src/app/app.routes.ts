import { Routes } from '@angular/router';
import {AuthGuard} from "./guards/auth/auth.guard";
import {inject} from "@angular/core";
import {SessionActiveGuard} from "./guards/auth/session-active-guard";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/rides/home/home.page').then((m) => m.HomePage),
    canActivate:[()=>inject(AuthGuard).canActivate()],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.page').then( m => m.LoginPage),
    canActivate:[()=>inject(SessionActiveGuard).canActivate()],
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.page').then( m => m.RegisterPage)

  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile/profile.page').then( m => m.ProfilePage),
    canActivate:[()=>inject(AuthGuard).canActivate()],
  },
  {
    path: 'earnings',
    loadComponent: () => import('./pages/earnings/earnings/earnings.page').then( m => m.EarningsPage),
    canActivate:[()=>inject(AuthGuard).canActivate()],
  },

];
