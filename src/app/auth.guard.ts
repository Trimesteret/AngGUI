import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const token = authService.getToken();

  if(token) {
    return authService.verifyToken(token);
  }

  return router.parseUrl('/login');

};
