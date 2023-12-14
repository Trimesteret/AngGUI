import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
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
    switchMap(isLoggedIn => {
      if (isLoggedIn) {
        return of(true);
      } else {
        messageService.show('Du er ikke logget ind');
        authService.logOut().subscribe();
        router.navigate(['/login']);
        return of(false);
      }
    }),
    catchError(() => {
      messageService.show('Du er ikke logget ind');
      authService.logOut().subscribe();
      router.navigate(['']);
      return of(false);
    })
  );
};
