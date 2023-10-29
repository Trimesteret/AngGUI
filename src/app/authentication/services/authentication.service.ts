import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationResult } from '../models/authentication-result';
import { AuthenticationPass } from '../models/authentication-pass';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  //Should not be here
  url = environment.apiUrl + '/Authentication';

  /**
   * The login function
   * @param authPass
   */
  public login(authPass: AuthenticationPass): Observable<AuthenticationResult>{
    return this.http.post<AuthenticationResult>(this.url, authPass);
  }

  public isLoggedIn(): boolean{
    return !!this.cookieService.get('token');
  }

  public logOut(): void {
    const token = this.cookieService.get('token');
    console.log(token);
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain', // Set the Content-Type header to text/plain
    });

    this.http.post<boolean>(this.url + '/LogOut', token, { headers: headers }).subscribe(res => {
      this.cookieService.deleteAll();
      console.log(res);
    },error => {
      console.log(error);
    });
  }
}
