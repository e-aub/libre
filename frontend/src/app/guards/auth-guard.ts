import { inject } from '@angular/core';
import { Router, CanActivateFn, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth-service/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) return true;

  return authService.refresh().pipe(
    map(() => true),
    catchError(() => {
      return of(router.createUrlTree(['/welcome'], {
        queryParams: { returnUrl: state.url }
      }));
    })
  );
};
