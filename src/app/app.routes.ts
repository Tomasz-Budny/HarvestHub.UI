import { Routes } from '@angular/router';

export const routes: Routes = [
 { path: 'dashboard', loadComponent: () => import('./dashboard/feature/dashboard.component').then(mod => mod.DashboardComponent) },
 { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(mod => mod.routes) },
 { path: '**', redirectTo: 'dashboard' }
];
