import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';
import { MessageService } from '../shared/services/message.service';
import { catchError, of, switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Roles } from '../shared/enums/roles';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const messageService = inject(MessageService);
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const expectedRole: Roles =route.data['expectedRole'];

  if(expectedRole == null){
    messageService.show('No role specified for this route');
    return false;
  }

  const token = authService.getToken();

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  return authService.verifyRole(token, expectedRole).pipe(
    switchMap(userRole => {
      if (userRole >= expectedRole) {
        cookieService.set('role', userRole.toString());
        return of(true);
      } else {
        messageService.show('You do not have permission to access this page');
        cookieService.delete('role');
        router.navigate(['/']);
        return of(false);
      }
    }),
    catchError(error => {
      messageService.show(error);
      return of(false);
    })
  );
};
