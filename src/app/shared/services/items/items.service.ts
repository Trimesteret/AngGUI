import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../authentication/models/user';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  url = environment.apiUrl + '/User';

  constructor(private httpClient: HttpClient) {
  }

  public getAllItems(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.url);
  }
}
