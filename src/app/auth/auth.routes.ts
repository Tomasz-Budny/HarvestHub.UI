import { Routes } from '@angular/router';

export const routes: Routes = [
 { path: 'login', loadComponent: () => import('./feature/login/login.component').then(mod => mod.LoginComponent) },
 { path: 'register', loadComponent: () => import('./feature/register/register.component').then(mod => mod.RegisterComponent) }
];
