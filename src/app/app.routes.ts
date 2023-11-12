import { Routes } from '@angular/router';

export const routes: Routes = [
 { path: 'dashboard', loadComponent: () => import('./dashboard/feature/dashboard.component').then(mod => mod.DashboardComponent) },
 { path: '**', redirectTo: 'dashboard' }
];
