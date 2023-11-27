import { Injectable } from '@angular/core';
import { User } from '../../authentication/models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl + '/User';


  constructor(private http: HttpClient) { }

  /**
   * Get user currently logged in
   */
  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.url + '/self');
  }

  /**
   * The get all users function
   */
  public getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }


  /**
   * Update the user currently logged in
   * @param user the update values
   */
  public updateCurrentUser(user: User): Observable<User> {
    return this.http.put<User>(this.url + '/edit', user);
  }
}
