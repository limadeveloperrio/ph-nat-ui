import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgZone, inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const zone = inject(NgZone);
  const token = localStorage.getItem('token');

  const clonedReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    : req;

  return next(clonedReq).pipe(
    catchError(error => {
      if (error.status === 401 || error.status === 403) {
        localStorage.removeItem('token'); // 🔹 Remove token inválido
        zone.run(() => router.navigate(['/login']));
      } else if (error.status === 0) {
        alert('Servidor indisponível. Por favor, tente novamente mais tarde.');
      }
      return throwError(() => error);
    })
  );
};
