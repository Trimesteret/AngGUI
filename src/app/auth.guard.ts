import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication/authentication.service';
import { of, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const token = authService.getToken();

  if (!token) {
    router.navigate(['/login']);
    return of(false);
  }

  return authService.verifyToken(token).pipe(
    tap(isValid => {
      if (!isValid) {
        authService.logOut();
        router.navigate(['/login']);
      }
    })
  );
};
