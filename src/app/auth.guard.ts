import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const token = authService.getToken();

  if(token) {
    return authService.verifyToken(token);
  }

  return router.parseUrl('/login');

};
