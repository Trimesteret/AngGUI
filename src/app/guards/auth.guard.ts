import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { of, tap } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';
import { MessageService } from '../shared/services/message.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  const token = authService.getToken();

  if (!token) {
    router.navigate(['/login']);
    return of(false);
  }

  return authService.verifyAuthToken(token).pipe(
    tap(isValid => {
      if (!isValid) {
        authService.logOut();
        router.navigate(['/login']);
        messageService.show('Your session has expired');
      }
    })
  );
};
