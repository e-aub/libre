import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth-service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  console.log('Auth Guard triggered!');

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
      return true;
  }

  router.navigate(['/welcome'], { 
    queryParams: { returnUrl: state.url } 
  });
  return false;
};