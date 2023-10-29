import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { AuthenticationPass } from '../../authentication/models/authentication-pass';
import { AuthenticationResult } from '../../authentication/models/authentication-result';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn = false;
  url = environment.apiUrl + '/Authentication';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  /**
   * The login function
   * @param authPass
   * https://angular.io/guide/router-tutorial-toh#milestone-5-route-guards
   */
  public login(authPass: AuthenticationPass): Observable<AuthenticationResult>{
    return this.http.post<AuthenticationResult>(this.url, authPass).pipe(
      tap(() => this.isLoggedIn = true)
    );
  }

  /**
   * Checks if the user is logged in and returns true or false OBS: Should be improved later
   */
  public checkIsLoggedIn(): boolean{
    return !!this.cookieService.get('jwtToken');
  }

  /**
   * Logs out the user with a token
   */
  public logOut(): Observable<boolean> {
    const params = new HttpParams().set('token ', this.cookieService.get('jwtToken'));
    return this.http.post<boolean>(this.url + '/LogOut',null, { params }).pipe(
      tap(() => {
        this.isLoggedIn = false;
        this.cookieService.deleteAll();
      })
    );
  }
}
