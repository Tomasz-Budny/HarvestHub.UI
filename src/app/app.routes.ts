import { Routes } from '@angular/router';
import { authGuard } from './auth/utils/auth.guard';

export const routes: Routes = [
 { path: 'dashboard', loadComponent: () => import('./dashboard/feature/dashboard.component').then(mod => mod.DashboardComponent), canActivate: [authGuard] },
 { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(mod => mod.routes) },
 { path: '**', redirectTo: 'auth' }
];
