import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
import { LoginDto } from '../../authentication/models/login-dto';
import { AuthPas } from '../../authentication/models/authPas';
import { User } from '../../authentication/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = environment.apiUrl + '/Authentication';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  /**
   * The login function
   * @param loginDto
   * https://angular.io/guide/router-tutorial-toh#milestone-5-route-guards
   */
  public login(loginDto: LoginDto): Observable<AuthPas>{
    return this.http.post<AuthPas>(this.url + '/Login', loginDto).pipe(
      tap(authRes => this.cookieService.set('jwtToken', authRes.token ))
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
   * Gets the logged in status
   */
  public getLoggedIn(): boolean {
    return this.cookieService.check('jwtToken');
  }

  /**
   * Verify token
   */
  public verifyToken(token: string): Observable<boolean>{
    return this.http.post<boolean>(this.url + '/verify', { token: token } as AuthPas);
  }

  /**
   * Logs out the user with a token
   */
  public logOut(): Observable<boolean> {
    const token = this.cookieService.get('jwtToken');
    this.cookieService.deleteAll();
    return this.http.post<boolean>(this.url + '/LogOut', { token: token } as AuthPas);
  }
}
