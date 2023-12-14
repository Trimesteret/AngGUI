import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
import { Role } from '../../enums/role';
import { LoginDto } from '../../models/login-dto';
import { AuthPas } from '../../models/auth-pas';
import { User } from '../../models/user';

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
      tap(authRes => {
        this.setCookies(authRes.token, authRes.role);
      }));
  }

  /**
   * Gets the role
   */
  public isEmployee(): boolean {
    return parseInt(this.cookieService.get('role')) ? parseInt(this.cookieService.get('role')) >= Role.Employee : false;
  }

  /**
   * Gets the role
   */
  public isAdmin(): boolean {
    return parseInt(this.cookieService.get('role')) ? parseInt(this.cookieService.get('role')) >= Role.Admin : false;
  }

  /**
   * The signup function
   * @param user
   */
  public signup(user: User): Observable<boolean>{
    return this.http.post<boolean>(this.url + '/Signup', user);
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
  public verifyAuthToken(token: string): Observable<boolean>{
    let params = new HttpParams();
    params = params.set('token', token);

    return this.http.get<boolean>(this.url + '/verify', { params: params });
  }

  /**
   * Verify role
   */
  public verifyRole(token: string, expectedRole: Role): Observable<Role>{
    let params = new HttpParams();
    params = params.set('expectedRole', expectedRole);
    params = params.set('token', token);
    return this.http.get<Role>(this.url + '/verifyRole', { params: params });
  }

  /**
   * Sets the cookies
   * @param token
   * @param role
   */
  public setCookies(token?: string, role?: Role): void {
    if(token) {
      this.cookieService.set('jwtToken', token);
    }

    if(Number.isInteger(role)) {
      this.cookieService.set('role', role.toString());
    }
  }

  /**
   * Deletes all cookies
   */
  public deleteCookies(): void {
    this.cookieService.delete('jwtToken');
    this.cookieService.delete('role');
    this.cookieService.deleteAll();
  }

  /**
   * Logs out the user with a token
   */
  public logOut(): Observable<boolean> {
    const token = this.cookieService.get('jwtToken');
    this.deleteCookies();
    if(!token) {
      return of(true);
    }
    return this.http.post<boolean>(this.url + '/LogOut', { token: token } as AuthPas);
  }
}
