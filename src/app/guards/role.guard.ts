import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';
import { MessageService } from '../shared/services/message.service';
import { catchError, of, switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Role } from '../shared/enums/role';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const messageService = inject(MessageService);
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const expectedRole: Role =route.data['expectedRole'];

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
      authService.logOut();
      router.navigate(['/login']);
      return of(false);
    })
  );
};
