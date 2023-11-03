import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { AuthenticationPass } from '../../authentication/models/authentication-pass';
import { AuthModel } from '../../authentication/models/authModel';
import { User } from '../../authentication/models/user';

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
  public login(authPass: AuthenticationPass): Observable<AuthModel>{
    return this.http.post<AuthModel>(this.url, authPass).pipe(
      tap(() => this.isLoggedIn = true)
    );
  }

  /**
   * The signup function
   * @param user
   */
  public signup(user: User): Observable<boolean>{
    return this.http.post<boolean>(this.url, user);
  }

  /**
   * Gets the token
   */
  public getToken(): string{
    return this.cookieService.get('jwtToken');
  }

  /**
   * Verify token
   */
  public verifyToken(token: string):Observable<boolean>{
    return this.http.post<boolean>(this.url + '/verify', { token: token } as AuthModel).pipe(
      tap(() => this.isLoggedIn = true)
    );
  }

  /**
   * Logs out the user with a token
   */
  public logOut(): Observable<boolean> {
    const token = this.cookieService.get('jwtToken');
    return this.http.post<boolean>(this.url + '/LogOut', { token: token } as AuthModel).pipe(
      tap(() => {
        this.isLoggedIn = false;
        this.cookieService.deleteAll();
      })
    );
  }
}
