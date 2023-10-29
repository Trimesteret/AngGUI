import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if(authService.checkIsLoggedIn()){
    return true;
  }

  return router.parseUrl('/login');

};
