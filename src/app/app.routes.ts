import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./core/components/product/product.routing') // 👈 aqui muda
        .then(m => m.PRODUCT_ROUTES)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./core/components/login/login.component')
        .then(m => m.LoginComponent)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];






