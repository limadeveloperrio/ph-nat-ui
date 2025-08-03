import { Routes } from '@angular/router';
import { AuthGuard } from '../../guards/AuthGuard';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./product-list/product-list.component').then(m => m.ProductListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./product-form/product-form.component').then(m => m.ProductFormComponent),
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./product-form/product-form.component').then(m => m.ProductFormComponent),
    canActivate: [AuthGuard]
  }
];

