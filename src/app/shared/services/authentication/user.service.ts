import { Injectable } from '@angular/core';
import { User } from '../../authentication/models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UserStandardDto } from '../../authentication/models/user-standard-dto';

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
  public getAllUsers(): Observable<UserStandardDto[]>{
    return this.http.get<UserStandardDto[]>(this.url);
  }

  /**
   * The get all users function
   */
  public getUserById(id: number): Observable<UserStandardDto>{
    return this.http.get<UserStandardDto>(this.url + '/' + id);
  }

  /**
   * The get all users function
   */
  public editUser(user: UserStandardDto): Observable<UserStandardDto>{
    return this.http.put<UserStandardDto>(this.url, user);
  }

  /**
   * Delete a user with a given id
   * @param id the id of the user to delete
   */
  public deleteUser(id: number): Observable<boolean>{
    return this.http.delete<boolean>(this.url + `/${id}`);
  }

  /**
   * Update the user currently logged in
   * @param user the update values
   */
  public updateCurrentUser(user: User): Observable<User> {
    return this.http.put<User>(this.url + '/edit', user);
  }
}
